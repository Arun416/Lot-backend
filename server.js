const express = require('express');
const adminLoginRouter = require('./routes/admin_routes');
const lotteriesDataRouter = require('./routes/lottery_routes');
const guessingDigits = require('./routes/guessingdigit_routes');

const dbConnect = require('./dbConnect');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const app = express();
dbConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api',adminLoginRouter);
app.use('/api',lotteriesDataRouter);
app.use('/api',guessingDigits);

app.listen(process.env.PORT,()=>{
    console.log("Server is running in port 5000");
})