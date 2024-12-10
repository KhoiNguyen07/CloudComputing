const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        // mongodb connectionString 
        const con = await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connect successfull => ',con.connection.host)
    } catch (error) {
        console.log('MongoDB connect fail: ', error)
        process.exit(1)
    }
}

module.exports = connectDB
