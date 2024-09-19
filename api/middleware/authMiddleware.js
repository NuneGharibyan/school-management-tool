const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key";

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return next();

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
  } catch (error) {
    console.error("Invalid token");
  }
  next();
}

module.exports = authenticate;
