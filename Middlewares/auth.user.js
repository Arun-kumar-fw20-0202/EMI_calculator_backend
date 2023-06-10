const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = rq.headers.authorization;

  if (token) {
    try {
      const decode = jwt.verify(token.split(" ")[1], "masai");
      if (decode) {
        req.body.authorID = decode.authorID;
        next();
      } else {
        res.json({ msg: "Please Login !!" });
      }
    } catch (err) {
      res.json({ err: err.message });
    }
  } else {
    res.json({ msg: "Please Login !!" });
  }
};
module.exports = { auth };
