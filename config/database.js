require('dotenv').config();

const mongoose = require('mongoose');

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL,{ 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=> console.log('DB Connected'))
    .catch(err => {
        console.log('Error Connecting to DB'); 
        console.log(err)
        process.exit(1);
    });
}