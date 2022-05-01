const express = require("express")
const { dbConnect }=require('./src/config/db');
const articleRouter=require('./src/routers/articleRouter');
const messageRouter=require('./src/routers/messageRouter');
const userRouter=require('./src/routers/userRouter');
const docsRouter=require('./src/documentation/index.doc');
const cors=require('cors')
const fileUploader=require('express-fileupload')
const { json } = require('express')
const PORT=process.env.PORT || 5000;

// new

// Connect to MongoDB database
dbConnect();

const app = express()


//cors
app.use(cors());
app.use(json())
app.use(fileUploader({useTempFiles: true}))

app.listen(PORT, () => {
  console.log(`Server has started! on PORT ${PORT}`)
})

app.get('/',(req,res)=>{
    res.json('Welcome to My brand server ').status(200)
})

app.use('/api/docs',docsRouter)

app.use('/api/articles',articleRouter);

app.use('/api/users',userRouter)

app.use('/api/message',messageRouter)

module.exports = app;