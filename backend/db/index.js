const mongoose = require("mongoose");

// connect to mongodb database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://localhost:27017/paytm"
    );
    console.log(`connected to Mongodb Database ${conn.connection.host}`);
  } catch (err) {
    console.log("ERROR connnecting to db");
  }
};

// define schema
const userSchema = new mongoose.Schema({
  // schema definition
  userName: String,
  firstName: String,
  lastName: String,
  password: String,
});

const accountSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  balance:{
    type: Number,
    required: true,
  }
})

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
module.exports = {
  User,
  Account,
  connectDB
};
