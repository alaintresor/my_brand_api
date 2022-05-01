const express=require('express')
const { sendMessage, getAllMessages } = require('../controllers/messageContraller')
const { protect } = require('../middlewares/AuthoMiddleware')
const router=express.Router()

router.post('/send',sendMessage)

router.get('/',protect,getAllMessages)

module.exports=router