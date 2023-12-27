const router = require('express').Router();
const {saveLottery,getAllLotteriesResults} = require('../controllers/lottery');
const AuthenticateToken = require('../middleware/authorization')

router.post('/lottery',AuthenticateToken,saveLottery)
router.get('/lotteries',AuthenticateToken,getAllLotteriesResults)
router.get('/lotteries/user',getAllLotteriesResults)


module.exports = router;