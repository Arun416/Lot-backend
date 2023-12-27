const guessingModel = require('../models/guessingdigit');


const getAllGuessingdigits = async(req,res)=>{

try {
    const {page,limit,sortField, sortOrder} = req.query;
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 5;
    const skip = (pageNumber - 1) * limitNumber;
    const sortNumber = sortOrder === 'desc' ? -1 : 1;
    const search = req.query.search || "";

    const sort = {};
    if (sortField) {
        sort[sortField] = sortNumber;
    }

    // Query MongoDB to get the total count and paginated data
    const [guessdigitInfo, total] = await Promise.all([
        guessingModel.find({GuessingNumber_3digit: {$regex: search, $options: "i"}}).skip(skip).limit(limitNumber).sort(sort),
        guessingModel.countDocuments({}),
    ]);

    const response = {
        error: false,
        total,
        page: pageNumber,
        limit: limitNumber,
        guessdigitInfo,
    };

    if (guessdigitInfo.length === 0) {
        return res.status(200).send({data:guessdigitInfo});
    }

    res.status(200).json({ data: response });
    }
    catch(err){
        return res.status(401).send(err)
    }
}


const saveGuessingDigit = async(req,res)=>{
    try {
        const guessingInfo = new guessingModel({
            Date: req.body.Date,
            Time: req.body.Time,
            GuessingNumber_3digit: req.body.GuessingNumber_3digit,
            GuessingNumber_4digit: req.body.GuessingNumber_4digit
        })

        const result  = await guessingInfo.save();
        if(result){
        res.status(201).json({message:"Guessing Number Saved Successfully",data:result})
        }
       
        }
    catch(err){
        res.status(400).json({
            message: "data not successful created",
            error: err.mesage,
    })
    }
}

module.exports = {saveGuessingDigit,getAllGuessingdigits}