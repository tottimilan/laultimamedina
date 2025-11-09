import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

/**
 * Crea una sesión de Checkout de Stripe
 * Maneja tanto donaciones únicas como mensuales
 */
export async function POST(request: NextRequest) {
  try {
    const { amount, type, locale } = await request.json();

    if (!amount || amount < 5) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: type === 'monthly' ? 'subscription' : 'payment',
      success_url: `${baseUrl}/${locale}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/${locale}/donate/cancel`,
      locale: locale === 'es' ? 'es' : 'en',
      metadata: {
        locale,
        donation_type: type,
      },
    };

    if (type === 'monthly') {
      // Donación recurrente: crear price y subscription
      const price = await stripe.prices.create({
        unit_amount: Math.round(amount * 100),
        currency: 'eur',
        recurring: {
          interval: 'month',
        },
        product_data: {
          name: locale === 'es' 
            ? 'Donación Mensual - La Última Medina' 
            : 'Monthly Donation - La Última Medina',
        },
      });

      sessionParams.line_items = [
        {
          price: price.id,
          quantity: 1,
        },
      ];
    } else {
      // Donación única
      sessionParams.line_items = [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: locale === 'es' 
                ? 'Donación - La Última Medina' 
                : 'Donation - La Última Medina',
              description: locale === 'es'
                ? 'Apoyo a la educación islámica de calidad'
                : 'Support for quality Islamic education',
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ];
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}

