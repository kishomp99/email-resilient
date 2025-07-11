# Resilient Email Service (Backend Project)

Hi! I'm Kishore Kumar, and this project is a backend-only service built using Node.js. It simulates how a production-grade email delivery system works behind the scenes — with support for retries, fallback providers, rate limiting, idempotency, and status tracking.

---

## Why I Built This

This project was created as a demonstration of my backend skills — particularly handling failure recovery, duplicate prevention, and robust request handling.

While the email providers here are simulated (mocked), the system is designed to mirror real-world logic used in production services like SendGrid or Mailgun.

---

## Features

- Sends Emails (Mock Providers)  
  Uses two simulated providers (`ProviderA`, `ProviderB`) that randomly succeed or fail.

- Retry Mechanism  
  Automatically retries failed requests up to 3 times using exponential backoff.

- Provider Fallback  
  If one provider fails after retries, it automatically switches to a backup provider.

- Idempotency  
  Each request has a unique `idempotencyKey` to prevent duplicates.

- Rate Limiting  
  Accepts only 5 email requests per minute (just like APIs protect themselves from abuse).

- Email Status Tracking  
  Each email’s status can be tracked using the same idempotency key.

---

## How to Test It

### 1. Start the server:

```bash
npm install
node src/index.js
```

Server runs at: http://localhost:3000

### 2. Send an Email (PowerShell)

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/send" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"test@example.com", "subject":"Test", "body":"Hello!", "idempotencyKey":"abc123"}'
```

### 3. Check Status

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/status/abc123"
```

---

## Project Structure

```
resilient-email-service/
├── src/
│   ├── index.js
│   ├── EmailService.js
│   ├── providers/
│   │   ├── ProviderA.js
│   │   └── ProviderB.js
│   └── utils/
│       └── RateLimiter.js
└── package.json
```

---

## Tech Stack

- Node.js
- Express.js
- JavaScript
- UUID (for unique keys)

---

## Final Note

I really enjoyed building this — not just to simulate sending emails, but to understand how real-world services handle reliability and scale.

Feel free to explore, test edge cases (like rate limit or duplicate keys), or even extend this with a database or real providers.

Made with care  
Kishore Kumar M P  
Sri Siddhartha Institute of Technology  
