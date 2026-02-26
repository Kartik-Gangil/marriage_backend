const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    service: 'smtp.zoho.in',
    port: 465,
    secure: true,  
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendMail(reciver , html) {
    const info = await transporter.sendMail({
        from: '"Leela Marriage Bureau" <shyama911@zohomail.in>',
        to: reciver,
        subject: "Confirmation Mail",
        // html: "<h2>Zoho SMTP working 🚀</h2>"
        html: html
    });

    console.log("Message sent:", info.messageId);
}

module.exports = sendMail;