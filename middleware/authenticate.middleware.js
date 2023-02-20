const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.headers?.token
  // console.log(token,"token");

  if (token) {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(decode,"decod")
    if (decode) {
      const userId = decode.userId;
      req.body.userId = userId;
      next();
    }
    else {
      res.send("Please Login First");
    }
  }
  else {
    res.send("Please Login First");
  }
};

module.exports =  authenticateUser ;