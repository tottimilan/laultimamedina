import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route para formulario de contacto
 * TODO: Integrar con servicio de email (SendGrid, Brevo, etc.)
 */
export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message, locale } = await request.json();

    // Validación básica
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // TODO: Enviar email usando servicio SMTP
    // Ejemplo con SendGrid:
    // await sendEmail({
    //   to: 'info@laultimamedina.org',
    //   from: 'noreply@laultimamedina.org',
    //   replyTo: email,
    //   subject: `[Contact Form] ${subject}`,
    //   text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    //   locale,
    // });

    // Por ahora, solo log
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message,
      locale,
      timestamp: new Date().toISOString(),
    });

    // TODO: También enviar email de confirmación al usuario

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

