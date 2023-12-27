const router = require('express').Router();
const {adminLogin} = require('../controllers/admin');

router.post('/admin/login',adminLogin)


module.exports = router;