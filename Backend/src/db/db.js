const mongoose = require('mongoose')

function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('connect to db')
        })
        .catch((err) => {
            console.log('error : ', err)
        })
}


module.exports = connectDB