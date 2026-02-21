import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: "norris.metz@ethereal.email",
        pass: "sMtVAZMxBsRJtUverA",
    },
});

export const sendEmail = async ({ to, subject, html }) => {
    const info = await transporter.sendMail({
        from: `"HireNest" ${transporter.user}`,
        to,
        subject,
        html,
    });

    const testEmailUrl = nodemailer.getTestMessageUrl(info);
    console.log("Verify Email Preview:", testEmailUrl);
};
