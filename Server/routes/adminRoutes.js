const  express = require('express')
const router = express.Router()


const {LoginAdmin } = require('../controllers/adminController');

router.post("/loginAdmin",LoginAdmin)

module.exports = router;