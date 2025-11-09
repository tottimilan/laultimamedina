import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

/**
 * POST - Cancelar suscripción mensual
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Obtener usuario con stripeSubscriptionId
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user?.stripeSubscriptionId) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 404 }
      );
    }

    // Cancelar en Stripe
    await stripe.subscriptions.cancel(user.stripeSubscriptionId);

    // Actualizar en DB
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        stripeSubscriptionId: null,
        stripePriceId: null,
        stripeCurrentPeriodEnd: null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    return NextResponse.json(
      { error: 'Error canceling subscription' },
      { status: 500 }
    );
  }
}

