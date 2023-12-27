const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminLogin = new mongoose.Schema({
    username: {
        type: String,
        required: true, 
    },
    password: {
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    
})

/* adminLogin.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  }); */

const adminLogin1 = mongoose.model('admin',adminLogin);

module.exports = adminLogin1;