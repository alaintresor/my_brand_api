const mongoose =require('mongoose');
const dotenv =require('dotenv');
dotenv.config();

// const { MONGO_URL } = process.env;

exports.dbConnect = () => {
  mongoose
    .connect(process.env.NODE_ENV === 'production'
    ? process.env.MONGO_PROD_URL
    : process.env.NODE_ENV === 'test'
    ? process.env.MONGO_TEST_URL
    : process.env.MONGO_DEV_URL, {

      useNewUrlParser: true,
    })
    .then(() => console.log('Connected to DB'));
};
// module.exports =dbConnect;