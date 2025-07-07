const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .send({ success: false, message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .send({
          success: false,
          message: "Token missing from authorization header",
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ success: false, message: "Authorization failed" });
      } else {
        req.body.userId = decoded.id;
        next();
      }
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({ success: false, message: "Auth middleware error" });
  }
};
