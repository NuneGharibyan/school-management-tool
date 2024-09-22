const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const isSignUpMutation = req.body?.query?.includes("mutation SignUp");
  const isLoginMutation = req.body?.query?.includes("mutation Login");

  if (isSignUpMutation || isLoginMutation) {
    return next();
  }

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    return res.sendStatus(401);
  }
};

module.exports = authenticate;
