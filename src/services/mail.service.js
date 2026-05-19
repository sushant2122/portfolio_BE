const nodemailer = require("nodemailer");

class MailService {
    transport;

    constructor() {
        try {
            let connectionOps = {
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD
                }
            }

            // For Gmail, use service instead of host/port
            if (process.env.SMTP_PROVIDER === 'gmail') {
                connectionOps = {
                    service: 'gmail',
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASSWORD
                    }
                }
            } else {
                // For other providers, add secure flag based on port
                connectionOps.secure = process.env.SMTP_PORT == 465; // true for 465, false for other ports
            }

            this.transport = nodemailer.createTransport(connectionOps);

            // Verify connection
            this.transport.verify((error, success) => {
                if (error) {
                    console.log("❌ Email Server connection failed:", error);
                } else {
                    console.log("✅ Email Server connected successfully.");
                }
            });
        } catch (exception) {
            console.log("❌ Error connecting mail service....", exception);
            throw exception;
        }
    }

    mailSend = async ({ to, sub, message, html, text }) => {
        try {
            const mailOptions = {
                to: to,
                from: process.env.SMTP_FROM || process.env.SMTP_USER, // Fixed: SMTP_FORM to SMTP_FROM
                subject: sub, // Fixed: sub to subject
                text: text || message?.replace(/<[^>]*>/g, '') || "", // Plain text version
                html: html || message // HTML version
            };

            const response = await this.transport.sendMail(mailOptions);
            console.log("✅ Email sent successfully to:", to);
            return response;
        } catch (exception) {
            console.error("❌ Error sending mail:", exception);
            throw {
                message: "Error sending mail",
                detail: exception,
                status: "EMAIL_SENDING_ERROR"
            };
        }
    }

    // Optional: Send email with attachment
    mailSendWithAttachment = async ({ to, sub, message, attachments }) => {
        try {
            const mailOptions = {
                to: to,
                from: process.env.SMTP_FROM || process.env.SMTP_USER,
                subject: sub,
                html: message,
                attachments: attachments
            };

            const response = await this.transport.sendMail(mailOptions);
            console.log("✅ Email with attachment sent successfully to:", to);
            return response;
        } catch (exception) {
            console.error("❌ Error sending mail with attachment:", exception);
            throw {
                message: "Error sending mail with attachment",
                detail: exception,
                status: "EMAIL_SENDING_ERROR"
            };
        }
    }
}

const Mailsvc = new MailService();
module.exports = Mailsvc;