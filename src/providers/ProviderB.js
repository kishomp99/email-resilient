class ProviderB {
  async sendEmail(email, subject, body) {
    if (Math.random() < 0.8) return true;
    throw new Error("ProviderB failed");
  }
}

module.exports = ProviderB;
