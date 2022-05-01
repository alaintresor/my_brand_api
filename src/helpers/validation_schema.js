const { ref } = require('joi')
const joi=require('joi')

const articleSchema=joi.object({
    title:joi.string().min(10).required(),
    content:joi.string().min(20).required()
})

const updateArticleSchema=joi.object({
    article_id:joi.string().required(),
    title:joi.string().min(10),
    content:joi.string().min(20)
})

const createUserSchema=joi.object({
    username:joi.string().required().min(4),
    email:joi.string().email().required(),
    password:joi.string().min(6).required(),
    confirm_password:joi.ref('password'),
})
const loginUserSchema=joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(6).required(),
})
const messageSchema=joi.object({
    name:joi.string().required(),
    email:joi.string().email().required(),
    message:joi.string().min(6).required(),
})

module.exports={
    articleSchema,updateArticleSchema,createUserSchema,loginUserSchema,messageSchema
}