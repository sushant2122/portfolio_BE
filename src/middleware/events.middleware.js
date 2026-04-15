const eventEmitter = require("events");
const myEvent = new eventEmitter();
const Mailsvc = require("../services/mail.service");

const EventName = {
    FORGET_PASSWORD: "forgotpassword",
    PASSWORD_RESET_SUCCESSFUL: "passwordresetsuccess",
    CONTACT_US: "contactus",
};

// Beautiful email template function for Sushant Paudyal Portfolio
const getEmailTemplate = (title, content, buttonText = null, buttonLink = null) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    color: #e0e0e0;
                    margin: 0;
                    padding: 0;
                    background-color: #121212;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background: linear-gradient(135deg, #FFD700 0%, #DAA520 100%);
                    padding: 30px;
                    text-align: center;
                    border-radius: 10px 10px 0 0;
                }
                .header h1 {
                    color: #1a1a1a;
                    margin: 0;
                    font-size: 32px;
                    letter-spacing: 2px;
                    font-weight: 700;
                }
                .header p {
                    color: #1a1a1a;
                    margin: 10px 0 0;
                    opacity: 0.9;
                    font-weight: 500;
                }
                .content {
                    background: #1a1a1a;
                    padding: 40px 30px;
                    border: 1px solid #333;
                    border-top: none;
                    border-radius: 0 0 10px 10px;
                }
                .button {
                    display: inline-block;
                    padding: 12px 30px;
                    background: linear-gradient(135deg, #FFD700 0%, #DAA520 100%);
                    color: #1a1a1a !important;
                    text-decoration: none;
                    border-radius: 5px;
                    margin: 20px 0;
                    font-weight: bold;
                    text-align: center;
                    transition: all 0.3s ease;
                }
                .button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    font-size: 12px;
                    color: #888;
                    border-top: 1px solid #333;
                    margin-top: 20px;
                    background-color: #121212;
                }
                .info-box {
                    background: #0d0d0d;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px 0;
                    border-left: 3px solid #FFD700;
                }
                .social-links {
                    margin: 20px 0;
                }
                .social-links a {
                    color: #FFD700;
                    text-decoration: none;
                    margin: 0 10px;
                    transition: color 0.3s ease;
                }
                .social-links a:hover {
                    color: #DAA520;
                }
                h2, h3 {
                    color: #FFD700;
                }
                p {
                    color: #e0e0e0;
                }
                a {
                    color: #FFD700;
                }
                ul {
                    color: #e0e0e0;
                }
                table {
                    color: #e0e0e0;
                }
                @media only screen and (max-width: 600px) {
                    .container {
                        width: 100%;
                        padding: 10px;
                    }
                    .content {
                        padding: 20px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>SUSHANT PAUDYAL</h1>
                    <p>Portfolio | Creative Developer | Problem Solver</p>
                </div>
                <div class="content">
                    ${content}
                    ${buttonText && buttonLink ? `
                        <div style="text-align: center;">
                            <a href="${buttonLink}" class="button">${buttonText}</a>
                        </div>
                    ` : ''}
                    <div class="info-box">
                        <p style="margin: 0; font-size: 12px; color: #aaa;">
                            <strong>Note:</strong> This is an automated message from Sushant Paudyal's Portfolio. Please do not reply to this email.
                        </p>
                    </div>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Sushant Paudyal. All rights reserved.</p>
                    <p>Kathmandu, Nepal</p>
                    <div class="social-links">
                        <a href="#">GitHub</a> | 
                        <a href="#">LinkedIn</a> | 
                        <a href="#">Twitter</a> |
                        <a href="#">Portfolio</a>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
};

// Mail sending event for forgot password
myEvent.on(EventName.FORGET_PASSWORD, async (data) => {
    try {
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${data.token}`;

        const content = `
            <h2>Hello ${data.name || 'User'},</h2>
            <p>We received a request to reset the password for your account associated with <strong>${data.email}</strong>.</p>
            <p>Click the button below to create a new password:</p>
            <div style="text-align: center;">
                <a href="${resetLink}" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #FFD700 0%, #DAA520 100%); color: #1a1a1a; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold;">
                    Reset Your Password
                </a>
            </div>
            <p>If you didn't request this, please ignore this email. Your password will remain unchanged.</p>
            <p>This link will expire in 1 hour for security reasons.</p>
            <p>Alternative link (if button doesn't work):<br/>
            <a href="${resetLink}" style="color: #FFD700;">${resetLink}</a></p>
        `;

        await Mailsvc.mailSend({
            to: data.email,
            sub: "🔐 Reset Your Password - Sushant Paudyal Portfolio",
            html: getEmailTemplate("Reset Password", content)
        });
        console.log("Forgot password email sent successfully to:", data.email);
    } catch (exception) {
        console.error("Failed to send forgot password email:", exception);
        // Don't exit process, just log error
    }
});

// Mail sending event for password reset successful
myEvent.on(EventName.PASSWORD_RESET_SUCCESSFUL, async (data) => {
    try {
        const signInLink = `${process.env.FRONTEND_URL}/signin`;

        const content = `
            <h2>Hello ${data.name || 'User'},</h2>
            <p>Your password has been successfully reset for your account associated with <strong>${data.email}</strong>.</p>
            <p>You can now log in to your account using your new password.</p>
            <div style="text-align: center;">
                <a href="${signInLink}" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #FFD700 0%, #DAA520 100%); color: #1a1a1a; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold;">
                    Sign In to Your Account
                </a>
            </div>
            <p>If you didn't make this change, please contact our support team immediately.</p>
            <p>For security reasons, we recommend:</p>
            <ul>
                <li>Using a strong, unique password</li>
                <li>Never sharing your password with anyone</li>
                <li>Enabling two-factor authentication if available</li>
            </ul>
        `;

        await Mailsvc.mailSend({
            to: data.email,
            sub: "✅ Password Reset Successful - Sushant Paudyal Portfolio",
            html: getEmailTemplate("Password Reset Successful", content)
        });
        console.log("Password reset success email sent to:", data.email);
    } catch (exception) {
        console.error("Failed to send password reset success email:", exception);
        // Don't exit process, just log error
    }
});

// Mail sending event for contact us form - FIXED VERSION
myEvent.on(EventName.CONTACT_US, async (data) => {
    try {
        const currentDate = new Date().toLocaleString('en-US', {
            dateStyle: 'full',
            timeStyle: 'medium'
        });

        const content = `
            <h2>📬 New Contact Form Submission</h2>
            
            <div class="info-box">
                <h3 style="color: #FFD700; margin-top: 0;">Message Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold;">Name:</td>
                        <td style="padding: 8px 0;">${data.name || 'Not provided'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                        <td style="padding: 8px 0;">
                            <a href="mailto:${data.email}" style="color: #FFD700;">${data.email}</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold;">Subject:</td>
                        <td style="padding: 8px 0;">
                            <span style="background: #0d0d0d; padding: 3px 8px; border-radius: 3px; color: #FFD700;">
                                ${data.subject || 'General Inquiry'}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold;">Submitted At:</td>
                        <td style="padding: 8px 0;">${currentDate}</td>
                    </tr>
                </table>
            </div>
            
            <div class="info-box">
                <h3 style="color: #FFD700; margin-top: 0;">Message:</h3>
                <p style="background: #0d0d0d; padding: 15px; border-left: 3px solid #FFD700; margin: 0; color: #e0e0e0;">
                    ${data.message || 'No message provided'}
                </p>
            </div>
            
            <div style="margin-top: 20px;">
                <h3 style="color: #FFD700;">Quick Actions:</h3>
                <ul>
                    <li><a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject || 'Your Inquiry')}" style="color: #FFD700;">Reply to ${data.name}</a></li>
                    ${data.phone ? `<li><a href="tel:${data.phone}" style="color: #FFD700;">Call ${data.name}</a></li>` : ''}
                </ul>
            </div>
        `;

        await Mailsvc.mailSend({
            to: process.env.ADMIN_EMAIL || "sushant.paudyal@example.com",
            sub: `📧 New Contact Form: ${data.subject || 'Inquiry'} from ${data.name}`,
            html: getEmailTemplate("New Contact Form Submission", content)
        });
        console.log("Contact Us email sent successfully to admin");

        // Optional: Send auto-reply to user
        await sendAutoReplyToUser(data);

    } catch (exception) {
        console.error("Failed to send Contact Us email:", exception);
        // Don't exit process, just log error
    }
});

// Auto-reply to user (optional)
const sendAutoReplyToUser = async (data) => {
    try {
        const userContent = `
            <h2>Thank you for contacting me, ${data.name}!</h2>
            <p>I have received your inquiry regarding <strong>${data.subject || 'my services'}</strong>.</p>
            <p>I will review your message and get back to you within 24-48 business hours.</p>
            
            <div class="info-box">
                <h3 style="color: #FFD700; margin-top: 0;">Here's what you wrote:</h3>
                <p><strong>Message:</strong><br/>${data.message}</p>
            </div>
            
            <p>In the meantime, you can:</p>
            <ul>
                <li>Check out my portfolio website for more of my work</li>
                <li>Follow me on GitHub and LinkedIn for project updates</li>
                <li>Explore my blog for tech insights and tutorials</li>
            </ul>
            
            <p>Looking forward to connecting with you!</p>
            <p>Best regards,<br/>
            <strong>Sushant Paudyal</strong><br/>
            Creative Developer | Problem Solver</p>
        `;

        await Mailsvc.mailSend({
            to: data.email,
            sub: "Thank you for reaching out - Sushant Paudyal",
            html: getEmailTemplate("Thank You for Reaching Out", userContent)
        });
        console.log("Auto-reply sent to user:", data.email);
    } catch (error) {
        console.error("Failed to send auto-reply:", error);
    }
};

module.exports = { myEvent, EventName };