import * as Brevo from "@getbrevo/brevo";
import dotenv from "dotenv";
dotenv.config();

const client = new Brevo.TransactionalEmailsApi();
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

// 📩 REGISTRO
const sendMailToRegister = async (userMail, token) => {
  try {
    const confirmationLink = `${process.env.URL_FRONTEND}/confirmar/${token}`;

    await client.sendTransacEmail({
      sender: { name: "AmiKuna", email: process.env.EMAIL_FROM },
      to: [{ email: userMail }],
      subject: "❤️🔥 AmiKuna 🔥❤️ - Confirma tu cuenta para empezar",
      htmlContent: `
        <!DOCTYPE html>
        <html lang="es">
        <head><meta charset="UTF-8"></head>
        <body style="margin:0; padding:0; font-family:Arial; background:#f9f9f9;">
          <div style="max-width:600px; margin:30px auto; background:white; border-radius:20px;">
            <div style="background:#ff4757; padding:40px; text-align:center; color:white;">
              <h1>🔥 AmiKuna 🔥</h1>
            </div>
            <div style="padding:30px; text-align:center;">
              <h2>¡Bienvenido! 💕</h2>
              <p>Confirma tu cuenta haciendo clic abajo:</p>
              <a href="${confirmationLink}" 
                 style="background:#ff4757; color:white; padding:15px 30px; 
                        border-radius:30px; text-decoration:none; display:inline-block; margin-top:20px;">
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

    await client.sendTransacEmail({
      sender: { name: "AmiKuna", email: process.env.EMAIL_FROM },
      to: [{ email: userMail }],
      subject: "🔐 AmiKuna - Recupera tu contraseña",
      htmlContent: `
        <div style="font-family:Arial; text-align:center; padding:30px;">
          <h2>Recuperar contraseña 🔐</h2>
          <p>Haz clic abajo para restablecer tu contraseña:</p>
          <a href="${resetLink}"
             style="background:#ff4757; color:white; padding:15px 30px; 
                    border-radius:30px; text-decoration:none; display:inline-block; margin-top:20px;">
             Restablecer contraseña
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