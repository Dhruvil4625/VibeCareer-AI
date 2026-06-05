import nodemailer from "nodemailer";

// Create reusable transporter object using the local SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || "465"),
  secure: process.env.EMAIL_SERVER_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

/**
 * Sends a premium HTML welcome email to newly registered candidates.
 * Non-blocking: Errors are logged, but will not crash the API or prevent account creation.
 */
export async function sendWelcomeEmail(to: string, userName: string) {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "VibeCareer AI";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const fromEmail = process.env.EMAIL_FROM || "dkrramolia20@gmail.com";

  const mailOptions = {
    from: `"${appName}" <${fromEmail}>`,
    to,
    subject: `🚀 Welcome to VibeCareer AI, ${userName}!`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to VibeCareer AI</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              background-color: #f6f5f9;
              color: #333333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
            }
            .header {
              background: linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%);
              color: #ffffff;
              padding: 32px 24px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 26px;
              font-weight: 800;
              letter-spacing: -0.5px;
            }
            .content {
              padding: 32px 24px;
              line-height: 1.6;
            }
            .greeting {
              font-size: 18px;
              font-weight: 700;
              margin-bottom: 16px;
              color: #1e1b4b;
            }
            .features {
              margin: 24px 0;
            }
            .feature-card {
              border-left: 3px solid #8b5cf6;
              background-color: #faf8ff;
              padding: 12px 16px;
              margin-bottom: 12px;
              border-radius: 0 8px 8px 0;
            }
            .feature-title {
              font-weight: 700;
              font-size: 14px;
              color: #5b21b6;
              margin: 0 0 4px 0;
            }
            .feature-desc {
              font-size: 13px;
              margin: 0;
              color: #4b5563;
            }
            .cta-container {
              text-align: center;
              margin: 32px 0 16px 0;
            }
            .cta-button {
              display: inline-block;
              background-color: #7c3aed;
              color: #ffffff !important;
              padding: 14px 28px;
              font-weight: 700;
              font-size: 14px;
              text-decoration: none;
              border-radius: 12px;
              box-shadow: 0 4px 14px rgba(124, 58, 237, 0.3);
            }
            .footer {
              background-color: #f8fafc;
              border-t: 1px solid #e2e8f0;
              padding: 24px;
              text-align: center;
              font-size: 11px;
              color: #94a3b8;
            }
            .footer a {
              color: #7c3aed;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>VibeCareer AI</h1>
            </div>
            <div class="content">
              <p class="greeting">Hi ${userName},</p>
              <p>Welcome to <strong>VibeCareer AI</strong>! We are excited to support you on your career journey. Our platform is equipped with industry-leading AI models to help you optimize your materials and stand out to recruiters.</p>
              
              <div class="features">
                <div class="feature-card">
                  <p class="feature-title">📄 Split-Workspace Resume Builder</p>
                  <p class="feature-desc">Optimize bullet points dynamically using the "AI Boost" tool and grade your resume directly against an ATS audit scanner.</p>
                </div>
                <div class="feature-card">
                  <p class="feature-title">💬 AI Career Coach</p>
                  <p class="feature-desc">Consult your coach at any time for salary package suggestions, application templates, or interview prep feedback.</p>
                </div>
                <div class="feature-card">
                  <p class="feature-title">🎤 AI Mock Interviews</p>
                  <p class="feature-desc">Practice behavioral or technical interview rounds. Record your answers to get comprehensive scorecards and advice.</p>
                </div>
              </div>

              <div class="cta-container">
                <a href="${appUrl}/dashboard" class="cta-button">Launch Your Dashboard</a>
              </div>
            </div>
            <div class="footer">
              <p>You received this email because you signed up for an account on VibeCareer AI.</p>
              <p>&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[SMTP Mailer] Welcome email successfully sent to ${to}. MessageID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[SMTP Mailer] Error sending email to ${to}:`, error);
    return { success: false, error };
  }
}

/**
 * Sends a premium HTML welcome back email to logging in candidates.
 * Non-blocking: Errors are logged, but will not crash the authentication callback.
 */
export async function sendLoginEmail(to: string, userName: string) {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "VibeCareer AI";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const fromEmail = process.env.EMAIL_FROM || "dkrramolia20@gmail.com";

  const mailOptions = {
    from: `"${appName}" <${fromEmail}>`,
    to,
    subject: `👋 Welcome back to VibeCareer AI, ${userName}!`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome Back to VibeCareer AI</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              background-color: #f6f5f9;
              color: #333333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
            }
            .header {
              background: linear-gradient(135deg, #4c1d95 0%, #1e1b4b 100%);
              color: #ffffff;
              padding: 32px 24px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 26px;
              font-weight: 800;
              letter-spacing: -0.5px;
            }
            .content {
              padding: 32px 24px;
              line-height: 1.6;
            }
            .greeting {
              font-size: 18px;
              font-weight: 700;
              margin-bottom: 16px;
              color: #1e1b4b;
            }
            .intro {
              margin-bottom: 24px;
              color: #4b5563;
              font-size: 14px;
            }
            .catalog-title {
              font-size: 14px;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              color: #7c3aed;
              margin-bottom: 16px;
            }
            .grid-container {
              display: grid;
              grid-template-columns: 1fr;
              gap: 16px;
              margin-bottom: 24px;
            }
            .catalog-item {
              background: #faf8ff;
              border: 1px solid #f3e8ff;
              border-radius: 12px;
              padding: 16px;
            }
            .item-header {
              font-weight: 700;
              font-size: 13.5px;
              color: #1e1b4b;
              margin-bottom: 4px;
            }
            .item-desc {
              font-size: 12.5px;
              color: #4b5563;
              margin: 0;
            }
            .cta-container {
              text-align: center;
              margin: 32px 0 16px 0;
            }
            .cta-button {
              display: inline-block;
              background-color: #7c3aed;
              color: #ffffff !important;
              padding: 14px 28px;
              font-weight: 700;
              font-size: 14px;
              text-decoration: none;
              border-radius: 12px;
              box-shadow: 0 4px 14px rgba(124, 58, 237, 0.3);
            }
            .footer {
              background-color: #f8fafc;
              border-t: 1px solid #e2e8f0;
              padding: 24px;
              text-align: center;
              font-size: 11px;
              color: #94a3b8;
            }
            .footer a {
              color: #7c3aed;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome Back to VibeCareer AI</h1>
            </div>
            <div class="content">
              <p class="greeting">Hello ${userName},</p>
              <p class="intro">Great to see you again! We noticed you just logged back into your account. Ready to keep polishing your materials and making progress on your applications today?</p>
              
              <h3 class="catalog-title">✨ Platform Catalog & Toolkit</h3>
              <div class="grid-container">
                <div class="catalog-item">
                  <div class="item-header">📄 Resume Workspace & ATS Scanner</div>
                  <p class="item-desc">Tweak your projects, update skills, boost bullets using Gemini, and live-print high-conversion templates with real-time feedback.</p>
                </div>
                <div class="catalog-item">
                  <div class="item-header">🎤 Speech Mock Interviewer</div>
                  <p class="item-desc">Test your answers on technical or behavioral questions. Get circular rating graphs, lists of strengths, and AI model response guides.</p>
                </div>
                <div class="catalog-item">
                  <div class="item-header">💬 Chat Coach Assistant</div>
                  <p class="item-desc">Consult your coach anytime for help with cover letters, salary negotiation scripts, or career switches.</p>
                </div>
                <div class="catalog-item">
                  <div class="item-header">🔗 LinkedIn Visibility Auditor</div>
                  <p class="item-desc">Analyze your profile keyword strengths, get predicted role match scores, and extract copyable headlines to pull in views.</p>
                </div>
                <div class="catalog-item">
                  <div class="item-header">🗂️ Kanban Application Tracker</div>
                  <p class="item-desc">Drag and drop job cards between pipelines to keep your recruitment steps completely organized.</p>
                </div>
                <div class="catalog-item">
                  <div class="item-header">⚙️ Portfolio Architecture Spectator</div>
                  <p class="item-desc">Showcase Next.js routing, Google Gemini prompt flows, and PostgreSQL database schemas directly to technical recruiters checking your portfolio.</p>
                </div>
              </div>

              <div class="cta-container">
                <a href="${appUrl}/dashboard" class="cta-button">Go to Dashboard</a>
              </div>
            </div>
            <div class="footer">
              <p>You received this email because you logged into your account on VibeCareer AI.</p>
              <p>&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[SMTP Mailer] Welcome back login email sent to ${to}. MessageID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[SMTP Mailer] Error sending login email to ${to}:`, error);
    return { success: false, error };
  }
}
