const express = require("express");
const { v4: uuidv4 } = require("uuid");
const EmailService = require("./EmailService");

const app = express();
const PORT = process.env.PORT || 3000;
const emailService = new EmailService();

app.use(express.json());

app.post("/send", async (req, res) => {
  const { email, subject, body, idempotencyKey } = req.body;
  const key = idempotencyKey || uuidv4();

  const result = await emailService.send(email, subject, body, key);
  res.json({ idempotencyKey: key, ...result });
});

app.get("/status/:key", (req, res) => {
  const status = emailService.getStatus(req.params.key);
  res.json({ status });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
