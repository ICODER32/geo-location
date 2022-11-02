const mongoose = require('mongoose')

const dbConnect = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database Connection Succesful: ${con.connection.host}`)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = dbConnect