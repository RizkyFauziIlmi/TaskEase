import nodemailer from "nodemailer";

const emailOption = {
  from: "taskeasetodo@gmail.com",
};

export async function sendOtpByEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: emailOption.from,
    to: email,
    subject: "OTP TaskEase Reset Password",
    html: `<html>
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:700px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:600px;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">TaskEase</a>
            </div>
            <p style="font-size:1.1em">Hi, ${email}</p>
            <p>We received a request to verify your Reset Password Request. <br/>Your verification code is:</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
            <p style="font-size:0.9em;">
              This OTP is valid for 5 minutes.
              <br/>
              If you did not request this code, it is possible that someone else is trying to access your account. <br/><b>Do not forward or give this code to anyone.</b>
              <br/>
              <br/>
              Sincerely yours,
              <br/>
              The TaskEase team</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
              <p>This email can't receive replies.</p>
            </div>
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
              <p>TaskEase Inc.</p>
              <p>Bandung, Cimahi</p>
              <p>Indonesia</p>
            </div>
          </div>
        </div>`,
  });
}

export async function sendWelcome(username, email) {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: emailOption.from,
    to: email,
    subject: "Welcome to TaskEase – Start Managing Your Tasks with Ease!",
    html: `
    <html>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
            }
            p {
                color: #555;
            }
            .footer {
                margin-top: 20px;
                text-align: center;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Thank You for Joining TaskEase!</h1>
            <p>Hi ${username} | ${email},</p>
            <p>We would like to express our gratitude for your decision to join TaskEase, the application designed to help you manage tasks and projects more efficiently.</p>
            <p>We hope your experience with TaskEase brings value and convenience. If you have any questions or feedback, feel free to reach out to us.</p>
            <div class="footer">
                <p>Warm regards,</p>
                <p>The TaskEase Team</p>
            </div>
        </div>
    </body>
    </html>
    `,
  });
}
