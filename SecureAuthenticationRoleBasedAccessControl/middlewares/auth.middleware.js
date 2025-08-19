const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (role) => {
  return (req, res, next) => {
    let decoded;
    try {
      let token = req.headers?.authorization?.split(" ")[1];
      if (token) {
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      } else {
        return res
          .status(400)
          .json({ message: "Token not found, Please login again" });
      }
    } catch (error) {
      if (error.message === "jwt expired") {
        let refreshToken = req.headers?.refreshtoken?.split(" ")[1];
        let refreshTokenDecoded = jwt.verify(
          refreshToken,
          process.env.JWT_SECRET_KEY
        );
        if (refreshTokenDecoded) {
          let newAccessToken = jwt.sign(
            {
              userId: refreshTokenDecoded.userId,
              role: refreshTokenDecoded.role,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: 60 * 15 }
          );
          decoded = jwt.verify(newAccessToken, process.env.JWT_SECRET_KEY);
        } else {
          return res
            .status(403)
            .json({ message: "token expired, login again" });
        }
      } else {
        res.status(500).json({ message: "Something went wrong" });
      }
    }
    if (decoded) {
      if (role.includes(decoded.role)) {
        req.user = decoded.userId;
        req.role = decoded.role;
        next();
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      return res
        .status(403)
        .json({ message: "Login failed, please login again" });
    }
  };
};

module.exports = authMiddleware;
