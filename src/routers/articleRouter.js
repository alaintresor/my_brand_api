const express = require("express");
const { getAllArticles, createNewArticle, getOneArticle, updateArticle, deleteArticle, commentingOnArticle, likeArticle } = require("../controllers/articleController");
const { protect } = require("../middlewares/AuthoMiddleware");
const router = express.Router();


router.get('/',getAllArticles)

router.get('/:id',getOneArticle);

router.post('/add',protect,createNewArticle)

router.patch('/update/:id',protect,updateArticle)

router.delete('/delete/:id',protect,deleteArticle)

router.post('/comment',protect,commentingOnArticle)

router.post('/like',protect,likeArticle)


module.exports = router;