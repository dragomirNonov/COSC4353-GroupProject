const jwt = require("jsonwebtoken");

module.exports.authUser = (req, res, next) => {
  const token = req.headers.token;
  // console.log("Token: ", token);

  let error = false;
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) {
      error = true;
    }
  });
  if (error === true) {
    return res.status(401).json({
      title: "unauthorized",
    });
  }
  next();
};
