const express = require("express");
const { v4: uuidv4 } = require("uuid");
const EmailService = require("./EmailService");

const app = express();
const PORT = process.env.PORT || 10000;

const emailService = new EmailService();

app.use(express.json());

app.post("/send", async (req, res) => {
  try {
    console.log("POST /send called with body:", req.body); 

    const { email, subject, body, idempotencyKey } = req.body;
    const key = idempotencyKey || uuidv4();

    const result = await emailService.send(email, subject, body, key);
    res.json({ idempotencyKey: key, ...result });
  } catch (err) {
    console.error("Error in /send route:", err); 
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/status/:key", (req, res) => {
  const status = emailService.getStatus(req.params.key);
  res.json({ status });
});

app.get("/", (req, res) => {
  res.send("Email Resilient API is running.");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
