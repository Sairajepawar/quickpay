const mongoose = require("mongoose");

// connect to mongodb database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
        process.env.MONGODB_URL,
    );
    console.log(`connected to Mongodb Database`);
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

// transaction scheme
const transactionSchema = new mongoose.Schema({
  sender:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reciever:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount:{
    type: Number,
    required: true,
  },
  date:{
    type: Date,
    required: true,
  }
})

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
const Transaction = mongoose.model("Transaction",transactionSchema);
module.exports = {
  User,
  Account,
  Transaction,
  connectDB
};
