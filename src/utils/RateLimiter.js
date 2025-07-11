const requestsPerMinute = 5;
let requestLog = [];

function isRateLimited() {
  const now = Date.now();
  requestLog = requestLog.filter(ts => now - ts < 60000);
  if (requestLog.length >= requestsPerMinute) return true;
  requestLog.push(now);
  return false;
}

module.exports = { isRateLimited };
