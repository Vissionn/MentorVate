const mongoose = require("mongoose");

require("dotenv").config();

const connectwithDB = async () =>  {
    try{
    await mongoose.connect(process.env.DB_URL, {})
        console.log("DB connection Successfully");
    }
    catch(error) {
        console.log("Issue in DB Connection");
        console.error(error.message);
        process.exit(1);
    };
}

module.exports = connectwithDB;