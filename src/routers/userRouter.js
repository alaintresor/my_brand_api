const express=require('express')
const { createNewUser, LoginUser, getUserInfo } = require('../controllers/userController')
const { protect } = require("../middlewares/AuthoMiddleware");

const router=express.Router()

router.post('/register',createNewUser)

router.post('/login',LoginUser)

router.get('/info',protect,getUserInfo)

module.exports=router