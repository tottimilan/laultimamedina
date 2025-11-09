import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * GET - Obtener favoritos del usuario
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ favorites });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json({ error: 'Error fetching favorites' }, { status: 500 });
  }
}

/**
 * POST - Añadir a favoritos
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { contentType, contentId, contentTitle } = await request.json();

    const favorite = await prisma.favorite.create({
      data: {
        userId: session.user.id,
        contentType,
        contentId,
        contentTitle,
      },
    });

    return NextResponse.json({ favorite });
  } catch (error) {
    console.error('Error adding favorite:', error);
    return NextResponse.json({ error: 'Error adding favorite' }, { status: 500 });
  }
}

