import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false });
  }

  try {
    await resend.emails.send({
      from: 'Contacto <onboarding@resend.dev>',
      to: ['tobias.irigoyen@gmail.com'],
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <h2>Nuevo mensaje</h2>
        <p><b>Nombre:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mensaje:</b> ${message}</p>
      `,
      reply_to: email, // 🔥 clave
    });

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false });
  }
}