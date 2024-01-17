const jwt = require("jsonwebtoken");

const checkAdminEmail = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  try {
    const decoded = jwt.verify(token, process.env.AUTH0_SECRET);
    if (decoded.email === "latenightdevsfw23@gmail.com") {
      next();
    } else {
      res.status(403).send("Access denied. Not an admin.");
    }
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = checkAdminEmail;
