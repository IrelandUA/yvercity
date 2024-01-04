const nodemailer = require("nodemailer");

class FormController {
  async sendForm(req, res, next) {
    try {
      console.log("registration", req.body);
      const body = req.body.data;
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER, // your Gmail email address
          pass: process.env.SMTP_PASSWORD, // your Gmail password
        },
      });
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.SMTP_USER, // recipient's email address
        subject: `${body.name} - ${body.schema}`,
        text: `Schema: ${body.schema}\nName: ${body.name}\nEmail: ${body.email}\nPhone: ${body.phone}\nMessage: ${body.comment}`,
      };
      return await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(400).json({data: 'Error'});
        } else {
          console.log(JSON.stringify(info, null, 2));
          res.status(200).json({data: 'Ok'});
        }
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

module.exports = new FormController();
