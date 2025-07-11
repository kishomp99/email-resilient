const ProviderA = require("./providers/ProviderA");
const ProviderB = require("./providers/ProviderB");
const { isRateLimited } = require("./utils/RateLimiter");

const sentEmails = new Set();
const statusMap = {};

class EmailService {
  constructor() {
    this.providerA = new ProviderA();
    this.providerB = new ProviderB();
  }

  async send(email, subject, body, idempotencyKey) {
    if (isRateLimited()) {
      return { status: "Rate limit exceeded" };
    }

    if (sentEmails.has(idempotencyKey)) {
      return { status: "Duplicate request ignored (idempotent)" };
    }

    const providers = [this.providerA, this.providerB];
    for (let i = 0; i < providers.length; i++) {
      try {
        await this.retrySend(providers[i], email, subject, body);
        sentEmails.add(idempotencyKey);
        statusMap[idempotencyKey] = `Sent using provider ${i + 1}`;
        return { status: "Success", provider: `Provider ${i + 1}` };
      } catch (err) {
        continue;
      }
    }

    statusMap[idempotencyKey] = "Failed";
    return { status: "All providers failed" };
  }

  async retrySend(provider, email, subject, body) {
    let retries = 3;
    let delay = 500;

    while (retries > 0) {
      try {
        await provider.sendEmail(email, subject, body);
        return;
      } catch (err) {
        await new Promise(res => setTimeout(res, delay));
        delay *= 2;
        retries--;
      }
    }

    throw new Error("All retries failed");
  }

  getStatus(idempotencyKey) {
    return statusMap[idempotencyKey] || "Unknown";
  }
}

module.exports = EmailService;
