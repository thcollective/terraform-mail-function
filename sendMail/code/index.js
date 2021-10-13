module.exports["trigger"] = async function (req, res) {
  res.set("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", [
      "Content-Type",
      "from",
      "to",
      "subject",
      "body",
    ]);
    res.set("Access-Control-Max-Age", "3600");
    return res.status(204).send("");
  }
  require("dotenv").config({ path: __dirname + "/.env" });
  const mailgun = require("mailgun-js");

  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_MAIL_DOMAIN,
  });

  const FROM = req["headers"].from;
  const TO = req["headers"].to;
  const SUBJECT = req["headers"].subject;
  const BODY = req["headers"].body;

  if (!FROM || !TO || !SUBJECT || !BODY) {
    res
      .status(400)
      .json("You must pass in FROM, TO, SUBJECT & BODY as headers.");
    return;
  }

  var mail = {
    from: FROM,
    to: TO,
    subject: SUBJECT,
    html: BODY,
  };

  try {
    await mg.messages().send(mail);
    res.json("Queued!");
  } catch (error) {
    res.status(400).json("Error");
  }
};
