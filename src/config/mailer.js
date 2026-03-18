import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

// 📩 REGISTRO
const sendMailToRegister = async (userMail, token) => {
  try {
    const confirmationLink = `${process.env.URL_FRONTEND}/confirmar/${token}`;

    await resend.emails.send({
      from: "AmiKuna <onboarding@resend.dev>", // luego cambias a tu dominio
      to: userMail,
      subject: "❤️🔥 AmiKuna 🔥❤️ - Confirma tu cuenta para empezar",
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
        </head>
        <body style="margin:0; padding:0; font-family:Arial; background:#f9f9f9;">
          <div style="max-width:600px; margin:30px auto; background:white; border-radius:20px;">
            <div style="background:#ff4757; padding:40px; text-align:center; color:white;">
              <h1>🔥 AmiKuna 🔥</h1>
            </div>
            <div style="padding:30px; text-align:center;">
              <h2>¡Bienvenido! 💕</h2>
              <p>Confirma tu cuenta:</p>
              <a href="${confirmationLink}" 
                 style="background:#ff4757; color:white; padding:15px 30px; border-radius:30px; text-decoration:none;">
                Confirmar cuenta
              </a>
            </div>
          </div>
        </body>
        </html>
      `
    });

    console.log("✅ Email de registro enviado:", userMail);

  } catch (error) {
    console.error("❌ Error en sendMailToRegister:", error);
    throw error;
  }
};


// 🔐 RECUPERAR PASSWORD
const sendMailToRecoveryPassword = async (userMail, token) => {
  try {
    const resetLink = `${process.env.URL_FRONTEND}/recuperarpassword/${token}`;

    await resend.emails.send({
      from: "AmiKuna <onboarding@resend.dev>",
      to: userMail,
      subject: "🔐 AmiKuna - Recupera tu contraseña",
      html: `
        <div style="font-family:Arial; text-align:center;">
          <h2>Recuperar contraseña 🔐</h2>
          <p>Haz clic abajo:</p>
          <a href="${resetLink}"
             style="background:#ff4757; color:white; padding:15px 30px; border-radius:30px;">
             Restablecer
          </a>
        </div>
      `
    });

    console.log("✅ Email de recuperación enviado:", userMail);

  } catch (error) {
    console.error("❌ Error en sendMailToRecoveryPassword:", error);
    throw error;
  }
};

export { sendMailToRegister, sendMailToRecoveryPassword };