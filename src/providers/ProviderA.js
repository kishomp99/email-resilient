class ProviderA {
  async sendEmail(email, subject, body) {
  console.log("❌ Provider A failed");
  throw new Error("Simulated failure");
}
}

module.exports = ProviderA;
