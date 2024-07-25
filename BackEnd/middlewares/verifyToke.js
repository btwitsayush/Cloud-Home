// hlds tfar pfxt tnei

const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized",
      data: {},
    });
  }

  // console.log("authorization=,",authorization);
  const token = authorization?.split(" ")?.[1];

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized",
      data: {},
    });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(401).json({
        status: "fail",
        message: "Unathorized",
        data: {},
      });
    }else{
      // console.log("decoded=",decoded);
        req.user = { email: decoded.data.email,_id:decoded.data._id };
            next();
    }
  });
};

module.exports = verifyToken;
