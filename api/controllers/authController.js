function login(req, res) {
  res.send("hi from login");
}
function register(req, res) {
  res.send("hi from register");
}
function checkAuth(req, res) {
  res.send("hi from checkAuth");
}

module.exports = { login, register, checkAuth };
