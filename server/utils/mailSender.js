const nodeMailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        // Create transport configuration
        let transporter = nodeMailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        // Send the email
        let info = await transporter.sendMail({
            from: 'StudyNotion || Code Help - by Deepak',
            to: email,
            subject: title,
            html: body, 
        });

        console.log("Email sent successfully:", info);

        return info;
    } catch (error) {
        console.log("Error at nodeMailer:", error);
    }
};

module.exports = mailSender;
