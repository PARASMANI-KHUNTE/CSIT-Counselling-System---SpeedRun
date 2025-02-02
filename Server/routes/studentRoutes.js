const  express = require('express')
const router = express.Router()


const {LoginAdmin } = require('../controllers/studentController');

router.post("/loginAdmin",LoginAdmin)

module.exports = router;