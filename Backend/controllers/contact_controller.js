const nodemailer = require('nodemailer');

// Function to handle contact form submissions
const submitContactForm = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Send email to support
        await sendEmailToSupport(name, email, message);

        res.status(200).json({ message: 'Your message has been sent successfully.' });
    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to send email to support
const sendEmailToSupport = async (name, email, message, surveyAnswer) => {
    try {
        // Create SMTP transporter
        const transporter = nodemailer.createTransport({
            host: 'mail.ajinkyatechnologies.in',
            port: 465,
            secure: true, 
            auth: {
                user: 'hello@ajinkyatechnologies.in', 
                pass: 'AjinkyaHello$123#' 
            }
        });

        // Send email
        await transporter.sendMail({
            from: '"Contact Form" <hello@ajinkyatechnologies.in>',
            to: 'nirajvernekar2002@gmail.com', 
            subject: 'New Contact Form Submission', 
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}` 
        });
    } catch (error) {
        throw error;
    }
};


module.exports = {
    submitContactForm
};
