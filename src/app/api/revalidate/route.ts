import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * API Route para revalidación de ISR desde Strapi
 * Se llama mediante webhook cuando se publica/actualiza contenido
 */

const REVALIDATE_SECRET = process.env.STRAPI_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    // Verificar secret token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${REVALIDATE_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { model, entry, event } = body;

    console.log('Revalidation webhook received:', { model, event, entryId: entry?.id });

    // Revalidar según el tipo de contenido
    switch (model) {
      case 'article':
        // Revalidar hub de artículos
        revalidateTag('articles');
        
        // Si es un artículo específico, revalidar su página
        if (entry?.slug) {
          revalidatePath(`/es/read/${entry.slug}`);
          revalidatePath(`/en/read/${entry.slug}`);
          revalidatePath(`/ar/read/${entry.slug}`);
        }
        
        // Revalidar home (por si está en spotlight)
        revalidatePath('/es');
        revalidatePath('/en');
        revalidatePath('/ar');
        break;

      case 'video':
        revalidateTag('videos');
        if (entry?.slug) {
          revalidatePath(`/es/watch/${entry.slug}`);
          revalidatePath(`/en/watch/${entry.slug}`);
          revalidatePath(`/ar/watch/${entry.slug}`);
        }
        revalidatePath('/es');
        revalidatePath('/en');
        revalidatePath('/ar');
        break;

      case 'podcast-episode':
        revalidateTag('podcast-episodes');
        if (entry?.slug) {
          revalidatePath(`/es/listen/${entry.slug}`);
          revalidatePath(`/en/listen/${entry.slug}`);
          revalidatePath(`/ar/listen/${entry.slug}`);
        }
        revalidatePath('/es');
        revalidatePath('/en');
        revalidatePath('/ar');
        break;

      case 'learn-module':
        revalidateTag('learn-modules');
        revalidatePath('/es/learn');
        revalidatePath('/en/learn');
        revalidatePath('/ar/learn');
        break;

      case 'job':
        revalidatePath('/es/careers');
        revalidatePath('/en/careers');
        revalidatePath('/ar/careers');
        break;

      default:
        // Revalidar home por defecto
        revalidatePath('/es');
        revalidatePath('/en');
        revalidatePath('/ar');
    }

    return NextResponse.json({ 
      revalidated: true, 
      model,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Error revalidating' },
      { status: 500 }
    );
  }
}

// También permitir GET para testing
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const path = searchParams.get('path');

  if (secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  if (path) {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path });
  }

  return NextResponse.json({ error: 'Missing path parameter' }, { status: 400 });
}

