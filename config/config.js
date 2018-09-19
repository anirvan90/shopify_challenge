const AUTH_SECRET = `90egnellahc_snikyffulf_yfipohs09`;

let config = function() {
  process.env.AUTH_SECRET = AUTH_SECRET;
};

module.exports = config;
