import transporter from '../config/nodemailer.js';

/**
 * Send OTP verification email
 */
export const sendOtpEmail = async (toEmail, otp) => {
  const html = `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:520px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="background:#0F5132;padding:28px 24px;text-align:center;">
        <h1 style="color:#C9A227;margin:0;font-size:22px;">Faizan E Madina Sunni Masjid</h1>
      </div>
      <div style="padding:32px 24px;text-align:center;">
        <h2 style="color:#0F5132;margin:0 0 8px;">Email Verification</h2>
        <p style="color:#555;margin:0 0 24px;">Use the code below to verify your email address:</p>
        <div style="background:#f0fdf4;border:2px dashed #0F5132;border-radius:8px;padding:20px;margin:0 0 24px;">
          <span style="font-size:36px;font-weight:700;letter-spacing:8px;color:#0F5132;">${otp}</span>
        </div>
        <p style="color:#888;font-size:13px;margin:0;">This code is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
      </div>
      <div style="background:#fafafa;padding:16px 24px;text-align:center;border-top:1px solid #e5e7eb;">
        <p style="color:#aaa;font-size:12px;margin:0;">If you did not request this, please ignore this email.</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Faizan E Madina" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: 'Your Verification Code — Faizan E Madina',
      html,
    });
  } catch (error) {
    console.error('EMAIL SEND FAILED:', error);
  }
};

/**
 * Send password reset email with a link
 */
export const sendPasswordResetEmail = async (toEmail, resetLink) => {
  const html = `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:520px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="background:#0F5132;padding:28px 24px;text-align:center;">
        <h1 style="color:#C9A227;margin:0;font-size:22px;">Faizan E Madina Sunni Masjid</h1>
      </div>
      <div style="padding:32px 24px;text-align:center;">
        <h2 style="color:#0F5132;margin:0 0 8px;">Reset Your Password</h2>
        <p style="color:#555;margin:0 0 24px;">Click the button below to set a new password:</p>
        <a href="${resetLink}" style="display:inline-block;background:#0F5132;color:#fff;text-decoration:none;padding:14px 36px;border-radius:8px;font-weight:600;font-size:15px;">Reset Password</a>
        <p style="color:#888;font-size:13px;margin:24px 0 0;">This link is valid for <strong>15 minutes</strong>.</p>
        <p style="color:#aaa;font-size:12px;margin:8px 0 0;">If the button doesn't work, copy and paste this URL:<br><a href="${resetLink}" style="color:#0F5132;">${resetLink}</a></p>
      </div>
      <div style="background:#fafafa;padding:16px 24px;text-align:center;border-top:1px solid #e5e7eb;">
        <p style="color:#aaa;font-size:12px;margin:0;">If you did not request a password reset, please ignore this email.</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Faizan E Madina" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: 'Password Reset — Faizan E Madina',
      html,
    });
  } catch (error) {
    console.error('EMAIL SEND FAILED:', error);
  }
};

/**
 * Send welcome email after successful verification
 */
export const sendWelcomeEmail = async (toEmail, fullName) => {
  const html = `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:520px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="background:#0F5132;padding:28px 24px;text-align:center;">
        <h1 style="color:#C9A227;margin:0;font-size:22px;">Faizan E Madina Sunni Masjid</h1>
      </div>
      <div style="padding:32px 24px;text-align:center;">
        <h2 style="color:#0F5132;margin:0 0 8px;">Welcome, ${fullName}!</h2>
        <p style="color:#555;margin:0 0 16px;">Your email has been verified successfully. You are now a member of our community.</p>
        <p style="color:#555;margin:0;">JazakAllahu Khairan for joining us. May Allah bless you.</p>
      </div>
      <div style="background:#fafafa;padding:16px 24px;text-align:center;border-top:1px solid #e5e7eb;">
        <p style="color:#aaa;font-size:12px;margin:0;">Faizan E Madina Sunni Masjid</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Faizan E Madina" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: 'Welcome to Faizan E Madina!',
      html,
    });
  } catch (error) {
    console.error('EMAIL SEND FAILED:', error);
  }
};

/**
 * Notify Admin of a new contact message
 */
export const sendContactNotificationEmail = async (adminEmails, contactMessage) => {
  const html = `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:520px;padding:24px;">
      <h2>New Contact Message: ${contactMessage.category}</h2>
      <p><strong>Name:</strong> ${contactMessage.name}</p>
      <p><strong>Email:</strong> ${contactMessage.email}</p>
      ${contactMessage.phone ? `<p><strong>Phone:</strong> ${contactMessage.phone}</p>` : ''}
      <p><strong>Subject:</strong> ${contactMessage.subject}</p>
      <hr>
      <p style="white-space: pre-wrap;">${contactMessage.message}</p>
    </div>
  `;
  try {
    if (adminEmails && adminEmails.length > 0) {
      await transporter.sendMail({
        from: `"Faizan E Madina" <${process.env.SMTP_USER}>`,
        to: adminEmails.join(','),
        subject: `New Contact: ${contactMessage.subject}`,
        html,
      });
    }
  } catch (error) {
    console.error('ADMIN NOTIFICATION FAILED:', error);
  }
};

/**
 * Send Reply to Visitor
 */
export const sendContactReplyEmail = async (toEmail, visitorName, originalSubject, replyMessage) => {
  const html = `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:520px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="background:#0F5132;padding:28px 24px;text-align:center;">
        <h1 style="color:#C9A227;margin:0;font-size:22px;">Faizan E Madina Sunni Masjid</h1>
      </div>
      <div style="padding:32px 24px;">
        <p style="color:#555;margin:0 0 16px;">Dear ${visitorName},</p>
        <p style="color:#555;margin:0 0 16px;white-space:pre-wrap;">${replyMessage}</p>
      </div>
      <div style="background:#fafafa;padding:16px 24px;text-align:center;border-top:1px solid #e5e7eb;">
        <p style="color:#aaa;font-size:12px;margin:0;">Reply to: ${originalSubject}</p>
      </div>
    </div>
  `;
  try {
    await transporter.sendMail({
      from: `"Faizan E Madina" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `Re: ${originalSubject}`,
      html,
    });
  } catch (error) {
    console.error('EMAIL SEND FAILED:', error);
    throw new Error('Failed to send email to visitor');
  }
};

