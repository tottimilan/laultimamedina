import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

// Webhook secrets (ambos webhooks probablemente usan el mismo secret)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const endpointSecretBilling = process.env.STRIPE_WEBHOOK_SECRET_BILLING || endpointSecret;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const sig = headers().get('stripe-signature')!;

    let event: Stripe.Event;

    // Intentar validar con el webhook principal primero, luego con el billing
    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err: any) {
      // Si falla con el primer secret, intentar con el segundo
      try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecretBilling);
      } catch (err2: any) {
        console.error(`Webhook signature verification failed with both secrets.`, err.message, err2.message);
        return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
      }
    }

    // Handle the event
    const eventType = event.type as string;
    
    switch (eventType) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;

        // Handle successful payment
        if (session.payment_status === 'paid') {
          await handleSuccessfulPayment(session);
        }
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentSucceeded(invoice);
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(failedInvoice);
        break;

      case 'customer.subscription.created':
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCreated(subscription);
        break;

      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(updatedSubscription);
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(deletedSubscription);
        break;

      // Billing Meter Events (Webhook 2 - Carga Breve)
      case 'v1.billing.meter.error_report_triggered':
        console.log('Billing meter error report triggered:', event.data.object);
        // Aquí puedes añadir lógica específica si necesitas manejar errores de billing
        break;

      case 'v1.billing.meter.no_meter_found':
        console.log('Billing meter not found:', event.data.object);
        // Aquí puedes añadir lógica específica si necesitas manejar este caso
        break;

      default:
        console.log(`Unhandled event type ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  try {
    const userId = session.metadata?.userId;
    const type = session.metadata?.type; // 'donation' or 'subscription'
    const amount = session.amount_total! / 100; // Convert from cents
    const currency = session.currency!;

    if (!userId) {
      console.error('No userId in session metadata');
      return;
    }

    // Create donation record
    await prisma.donation.create({
      data: {
        userId,
        amount,
        currency,
        type: type === 'subscription' ? 'monthly' : 'one-time',
        stripePaymentId: session.id, // Using session ID as payment ID
        status: 'succeeded',
        matchGiftCompany: session.metadata?.matchGiftCompany,
      },
    });

    console.log(`Payment recorded for user ${userId}: $${amount} ${currency}`);
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  try {
    const subscriptionId = invoice.subscription as string;

    // Update donation status for recurring payments
    await prisma.donation.updateMany({
      where: {
        stripePaymentId: invoice.id, // Using invoice ID to match
      },
      data: {
        status: 'succeeded',
      },
    });

    console.log(`Invoice payment succeeded for subscription ${subscriptionId}`);
  } catch (error) {
    console.error('Error handling invoice payment succeeded:', error);
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  try {
    const subscriptionId = invoice.subscription as string;

    // Update donation status for failed payments
    await prisma.donation.updateMany({
      where: {
        stripePaymentId: invoice.id, // Using invoice ID to match
      },
      data: {
        status: 'failed',
      },
    });

    console.log(`Invoice payment failed for subscription ${subscriptionId}`);
  } catch (error) {
    console.error('Error handling invoice payment failed:', error);
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  try {
    const userId = subscription.metadata?.userId;

    if (!userId) {
      console.error('No userId in subscription metadata');
      return;
    }

    // Update user with Stripe customer ID if not set
    await prisma.user.update({
      where: { id: userId },
      data: {
        stripeCustomerId: subscription.customer as string,
      },
    });

    console.log(`Subscription created for user ${userId}`);
  } catch (error) {
    console.error('Error handling subscription created:', error);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    const userId = subscription.metadata?.userId;

    if (!userId) {
      console.error('No userId in subscription metadata');
      return;
    }

    // Handle subscription status changes
    const status = subscription.status;

    if (status === 'canceled' || status === 'incomplete_expired') {
      // Could update user subscription status here
      console.log(`Subscription ${status} for user ${userId}`);
    }

    console.log(`Subscription updated for user ${userId}: ${status}`);
  } catch (error) {
    console.error('Error handling subscription updated:', error);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    const userId = subscription.metadata?.userId;

    if (!userId) {
      console.error('No userId in subscription metadata');
      return;
    }

    console.log(`Subscription deleted for user ${userId}`);
  } catch (error) {
    console.error('Error handling subscription deleted:', error);
  }
}