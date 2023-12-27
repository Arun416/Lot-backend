const mongoose = require('mongoose');


const guessing_model = new mongoose.Schema({
    Date : {
        type: Date,
        required:true
    },
    Time: {
        type: Date,
        required: true
    },
    GuessingNumber_3digit:{
        type:String,
        required: false
    },
    GuessingNumber_4digit:{
        type:String,
        required: false
    }
},{timestamps: true})

const guessModel = mongoose.model('GuessingNumbers',guessing_model);

module.exports = guessModel;