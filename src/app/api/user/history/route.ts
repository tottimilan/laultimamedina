import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * GET - Obtener historial del usuario
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const history = await prisma.viewHistory.findMany({
      where: { userId: session.user.id },
      orderBy: { viewedAt: 'desc' },
      take: 50, // Últimos 50 items
    });

    return NextResponse.json({ history });
  } catch (error) {
    console.error('Error fetching history:', error);
    return NextResponse.json({ error: 'Error fetching history' }, { status: 500 });
  }
}

/**
 * POST - Registrar visualización
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { contentType, contentId, contentTitle, progress } = await request.json();

    // Buscar si ya existe un registro
    const existing = await prisma.viewHistory.findFirst({
      where: {
        userId: session.user.id,
        contentType,
        contentId,
      },
    });

    let viewHistory;

    if (existing) {
      // Actualizar existente
      viewHistory = await prisma.viewHistory.update({
        where: { id: existing.id },
        data: {
          progress: progress || existing.progress,
          completed: progress >= 95 ? true : existing.completed,
          viewedAt: new Date(),
        },
      });
    } else {
      // Crear nuevo
      viewHistory = await prisma.viewHistory.create({
        data: {
          userId: session.user.id,
          contentType,
          contentId,
          contentTitle,
          progress: progress || 0,
        },
      });
    }

    return NextResponse.json({ viewHistory });
  } catch (error) {
    console.error('Error tracking view:', error);
    return NextResponse.json({ error: 'Error tracking view' }, { status: 500 });
  }
}

