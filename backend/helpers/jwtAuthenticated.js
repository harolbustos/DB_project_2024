const jwt = require('jsonwebtoken');

const jwtAuthenticated = (req, res, next) => {
  const authJwt = req.headers.authorization;

  if (!authJwt) {
    res.json({success: false, message: "acceso denegado"})
    return;
  }

  try {
    const decoded = jwt.verify(authJwt, process.env.JWT_PASSWORD);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({success: false, message: "Token invalido"});
  }
};

module.exports = jwtAuthenticated;