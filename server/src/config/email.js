const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Configure Gmail transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Email from env
    pass: process.env.EMAIL_PASS, // Email password from env
  },
});

/**
 * Send welcome email to new user
 */
const sendWelcomeEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🎉 Welcome to Mindora - Your Wellness Journey Begins',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0;">Welcome to Mindora, ${name}!</h1>
            <p style="margin: 10px 0 0 0;">Your AI-Powered Mental Wellness Companion</p>
          </div>
          <div style="padding: 30px; background: #f9f9f9; border: 1px solid #ddd;">
            <p>Hi ${name},</p>
            <p>Thank you for joining Mindora! We're excited to help you on your wellness journey.</p>
            <h3 style="color: #667eea;">Get Started:</h3>
            <ul>
              <li>📊 Track your daily moods and emotions</li>
              <li>📖 Journal your thoughts and reflections</li>
              <li>🤖 Chat with your AI wellness assistant</li>
              <li>💡 Get daily affirmations and motivation</li>
            </ul>
            <a href="${process.env.CLIENT_URL}/dashboard" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Start Your Journey</a>
            <p style="margin-top: 30px; font-size: 12px; color: #666;">
              Questions? Reply to this email or contact our support team.
            </p>
          </div>
          <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 10px 10px;">
            <p>Mindora © 2024. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    throw error;
  }
};

/**
 * Send password reset email
 */
const sendPasswordResetEmail = async (email, resetToken, userName) => {
  try {
    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🔐 Reset Your Mindora Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0;">Password Reset Request</h1>
          </div>
          <div style="padding: 30px; background: #f9f9f9; border: 1px solid #ddd;">
            <p>Hi ${userName},</p>
            <p>We received a request to reset your Mindora password. Click the link below to create a new password.</p>
            <a href="${resetLink}" style="display: inline-block; background: #f5576c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Reset Password</a>
            <p style="color: #666; font-size: 14px;">This link expires in 1 hour.</p>
            <p style="color: #666; font-size: 12px;">If you didn't request a password reset, please ignore this email.</p>
          </div>
          <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 10px 10px;">
            <p>Mindora © 2024. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
    throw error;
  }
};

/**
 * Send email verification
 */
const sendVerificationEmail = async (email, verificationToken, userName) => {
  try {
    const verifyLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '✉️ Verify Your Mindora Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0;">Email Verification</h1>
          </div>
          <div style="padding: 30px; background: #f9f9f9; border: 1px solid #ddd;">
            <p>Hi ${userName},</p>
            <p>Thank you for signing up! Please verify your email address to activate your account.</p>
            <a href="${verifyLink}" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Verify Email</a>
            <p style="color: #666; font-size: 12px;">This link expires in 24 hours.</p>
          </div>
          <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 10px 10px;">
            <p>Mindora © 2024. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('❌ Error sending verification email:', error);
    throw error;
  }
};

module.exports = {
  transporter,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendVerificationEmail,
};
