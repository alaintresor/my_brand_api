const cloudinary=require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dnipqs2mh',
    api_key: '121464622239229',
    api_secret: 'TxX4BUeXzeQVBohgb7n9rxrnro8'
});


module.exports = cloudinary.uploader;
