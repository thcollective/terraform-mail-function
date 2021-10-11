module.exports["trigger"] = async function (req, res) {
  require("dotenv").config({ path: __dirname + "/.env" });
  const mailgun = require("mailgun-js");

  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_MAIL_DOMAIN,
  });

  var mail = {
    from: process.env.EMAIL_MAIN,
    to: "realkaiz7@gmail.com",
    subject: "Hi Kaiz",
    html: "<b>Testing terraform</b>",
  };

  try {
    const data = await mg.messages().send(mail);
    // console.log(data);
    // return data;
    res.json("Ok");
  } catch (error) {
    res.status(400).json("Error");
  }
};
