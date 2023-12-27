const router = require('express').Router();
const {saveGuessingDigit,getAllGuessingdigits} =  require('../controllers/guessingdigit');
const AuthenticateToken = require('../middleware/authorization')

router.post('/guessingDigit',AuthenticateToken,saveGuessingDigit)
router.get('/guessingDigit',AuthenticateToken,getAllGuessingdigits)
router.get('/guessingDigit/user',getAllGuessingdigits)
module.exports = router;