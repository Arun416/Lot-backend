const mongoose = require('mongoose');


const lettery_model = new mongoose.Schema({
    Date : {
        type: Date,
        required:true
    },
    Time: {
        type: Date,
        required: true
    },
    lottery_Number:{
        type:String,
        required: true
    }
},{timestamps: true})

const data = mongoose.model('LotteryInfo',lettery_model);

module.exports = data;