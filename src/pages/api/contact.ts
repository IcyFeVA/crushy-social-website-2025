import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const post: APIRoute = async ({ request }) => {
  const data = await request.formData();
  
  // Create transporter using your email service credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your preferred service
    auth: {
      user: import.meta.env.EMAIL_USER,
      pass: import.meta.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: data.get('email'),
      to: 'your-email@domain.com',
      subject: `Contact form submission from ${data.get('name')}`,
      text: data.get('message'),
    });

    return new Response(JSON.stringify({
      message: 'Success!'
    }), {
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({
      message: 'Error sending email'
    }), {
      status: 500
    });
  }
}; 