const  express = require('express')
const router = express.Router()


const {LoginAdmin,createSession } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware')
router.post("/loginAdmin",LoginAdmin)
router.post('/createSession',authMiddleware,createSession)

module.exports = router;