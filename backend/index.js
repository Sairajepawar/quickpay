const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/mainRouter");
const { connectDB } = require('./db')
const cors = require("cors");


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); //middleware to parse json

// defining the routes
app.use('/api/v1/',mainRouter);

app.listen(port, () => {
  console.log(`Server is lauched on ${port}`);
});
connectDB();