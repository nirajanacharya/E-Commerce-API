require('dotenv').config();
const nodemailer = require('nodemailer');

class mailService {
    #transport; // Private variable is defined by # in JS
    constructor() {
        try {
            const config = { // Declare the variable using `const`
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                //secure: process.env.SMTP_SECURE,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD
                }
            };
            if (process.env.SMTP_PROVIDER === "gmail") {
                config['service'] = "gmail";
            }
            this.#transport = nodemailer.createTransport(config);
        } catch (exception) {
            console.log("Error connecting mail server");
            console.log(exception);
            throw exception;
        }
    }

    sendEmail = async ({ to, subject, html }) => {
        try {
            const response = await this.#transport.sendMail({
                to: to,
                subject: subject,
                from: process.env.SMTP_FROM_ADDRESS,
                html: html // Correct variable name to match function parameters
            });
            console.log("Email sent", response);
            return response;
        } catch (exception) {
            console.log("Error sending mail");
            console.log(exception);
            throw exception;
        }
    }
}

const mailSvc = new mailService();
module.exports = mailSvc;