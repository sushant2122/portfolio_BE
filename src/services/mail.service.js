const { Resend } = require("resend");

class MailService {
    constructor() {
        this.resend = new Resend(process.env.RESEND_API_KEY);
        console.log("✅ Resend mail service initialized");
    }

    mailSend = async ({ to, sub, message, html, text }) => {
        try {
            const response = await this.resend.emails.send({
                from: process.env.SMTP_FROM || "onboarding@resend.dev",
                to: to,
                subject: sub,
                html: html || message,
                text: text || "",
            });

            console.log("✅ Email sent successfully to:", to, "| ID:", response.data?.id);
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

    mailSendWithAttachment = async ({ to, sub, message, attachments }) => {
        try {
            const response = await this.resend.emails.send({
                from: process.env.SMTP_FROM || "onboarding@resend.dev",
                to: to,
                subject: sub,
                html: message,
                attachments: attachments?.map(a => ({
                    filename: a.filename,
                    content: a.content,
                })),
            });

            console.log("✅ Email with attachment sent to:", to);
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