const mongoose =require('mongoose');
const dotenv =require('dotenv');
dotenv.config();

// const { MONGO_URL } = process.env;

exports.dbConnect = () => {
  mongoose
    .connect(process.env.NODE_ENV === 'production'
    ? process.env.MONGO_PROD_URL
    : process.env.NODE_ENV === 'test'
    ? "mongodb+srv://alain:kabebe22@cluster0.ax3p6.mongodb.net/my_brand_test?retryWrites=true&w=majority"
    : process.env.MONGO_DEV_URL, {

      useNewUrlParser: true,
    })
    .then(() => {console.log('Connected to DB')});
};
// module.exports =dbConnect;