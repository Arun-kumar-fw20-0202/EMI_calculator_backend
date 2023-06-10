const mongoose = require("mongoose");
require("dotenv").config();

let connection = mongoose.connect(process.env.mongoUrl);
//
//
// lkasjldfkjasdf
module.exports = { connection };
