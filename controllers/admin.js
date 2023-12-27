const admin  = require('../models/admin');
const jwt = require('jsonwebtoken');

const adminLogin = async(req,res)=>{
    const {username,password} = req.body
    try {
      let user = await admin.findOne({username , password});
      let userData = {
        username: user.username,
        password:user.password,
        _id: user._id
      }
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: ' User not found' });
      }
      if (userData.username != username) {
        return res.status(401).json({ message: 'Invalid User' });
      }

      if(userData.password!= password){
        return res.status(401).json({ message: 'Invalid Password' });
      }
      const token = jwt.sign(userData,process.env.ACCESS_TOKEN_SECRET, { expiresIn:'1hr' });

      res.status(200).json({success:true, message: 'Login Successfully',token: token,expiresIn:3600,username: userData.username });
    }
    catch(err){
      res.status(401).json({
        message: "Unauthorized User",
        error: err.mesage,
    })
}
}

module.exports = {adminLogin}