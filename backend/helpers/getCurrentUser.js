var jwt = require('jsonwebtoken');


const getCurrentUser = async (req) => {
    const cookie = req.headers.authorization;
    
    if (!cookie) return null;
    
      try {
        const token = await jwt.verify(cookie, process.env.JWT_PASSWORD);
        return token;
      } catch (error) {
        console.log("error", error);
        return null;
      }
};

module.exports = getCurrentUser;