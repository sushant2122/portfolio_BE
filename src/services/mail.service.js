const nodemailer = require("nodemailer");

class MailService {
    transport;

    constructor() {
        try {

            let connectionOps = {};

            // Gmail Configuration
            if (process.env.SMTP_PROVIDER === "gmail") {

                connectionOps = {
                    service: "gmail",

                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASSWORD
                    },

                    tls: {
                        rejectUnauthorized: false
                    }
                };

            } else {

                // Other SMTP Providers
                connectionOps = {
                    host: process.env.SMTP_HOST,

                    port: Number(process.env.SMTP_PORT),

                    secure: Number(process.env.SMTP_PORT) === 465,

                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASSWORD
                    },

                    tls: {
                        rejectUnauthorized: false
                    }
                };
            }

            console.log("SMTP CONFIG CHECK:", {
                provider: process.env.SMTP_PROVIDER,
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                user: process.env.SMTP_USER,
                passExists: !!process.env.SMTP_PASSWORD
            });

            this.transport = nodemailer.createTransport(connectionOps);

            this.transport.verify((error, success) => {

                if (error) {

                    console.log("❌ EMAIL SERVER ERROR:");
                    console.log(error);

                } else {

                    console.log("✅ EMAIL SERVER CONNECTED");
                }
            });

        } catch (exception) {

            console.log("❌ MAIL SERVICE CONNECTION ERROR:");
            console.log(exception);
        }
    }
}

const Mailsvc = new MailService();
module.exports = Mailsvc;