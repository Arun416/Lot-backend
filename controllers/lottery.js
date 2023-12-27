const lotteryModel = require('../models/lottery');



const getAllLotteriesResults = async(req,res)=>{
    try {
       /*  const page = parseInt(req.query.page)-1 || 0 ;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let sort =  req.query.sort || "Time"; */
        // let type = req.query.type = 'All'

        // req.query.sort ? (sort = req.query.sort.split(",")): (sort = [sort]);

       /*  let sortBy = {}

        if(sort[1]){
            sortBy[sort[0] = sort[1]]
        }
        else {
            sortBy[sort[0]] = "desc"
        } */

      /*   const lotteries = await lotteryModel.find({lottery_Number: {$regex: search, $options: "i"}})
        .sort(sortBy)
        .skip(page*limit)
        .limit(limit) */

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
    const [lotteries, total] = await Promise.all([
        lotteryModel.find({lottery_Number: {$regex: search, $options: "i"}}).skip(skip).limit(limitNumber).sort(sort),
        lotteryModel.countDocuments({}),
    ]);

    const response = {
        error: false,
        total,
        page: pageNumber,
        limit: limitNumber,
        lotteries,
    };

    if (lotteries.length === 0) {
        return res.status(401).send('Unauthorized');
    }

    res.status(200).json({ data: response });
    }
    catch(err){
                return res.status(401).send(err)
    }
}

const saveLottery = async(req,res)=>{
    try {
        const lotteryInfo = new lotteryModel({
            Date: req.body.Date,
            Time: req.body.Time,
            lottery_Number: req.body.lottery_Number
        })

        const result  = await lotteryInfo.save();
        if(result){
        res.status(201).json({message:"Data Saved Successfully",data:result})
        }
       
        }
    catch(err){
        res.status(400).json({
            message: "data not successful created",
            error: err.mesage,
    })
    }
}

module.exports = {saveLottery,getAllLotteriesResults}


