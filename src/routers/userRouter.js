const express=require('express')
const { createNewUser, LoginUser } = require('../controllers/userController')

const router=express.Router()

router.post('/register',createNewUser)

router.post('/login',LoginUser)

module.exports=router