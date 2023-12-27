const jwt = require('jsonwebtoken');
const User = require('../models/admin')

const AuthenticateToken= async(req,res,next)=> {
    const token = req.header('Authorization').replace('Bearer ', '');

    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findOne({ _id: decoded._id });
  
        if (!user) {
          throw new Error();
        }
  
        req.user = user;
        next();
      } else {
        res.status(401).json({ message: 'Unauthorized User' });
      }
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        // Handle token expiration error here
        res.status(401).json({ message: 'Token expired' });
      } else {
        // Handle other JWT errors
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
}

module.exports = AuthenticateToken
