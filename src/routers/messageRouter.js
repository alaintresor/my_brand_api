const express=require('express')
const { sendMessage, getAllMessages, deleteMessage } = require('../controllers/messageContraller')
const { protect } = require('../middlewares/AuthoMiddleware')
const router=express.Router()

router.post('/send',sendMessage)

router.get('/',protect,getAllMessages)

router.delete('/delete/:id',protect,deleteMessage)

module.exports=router