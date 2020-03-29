const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// Creating express server
const app = express();
const port = process.env.PORT || 5000;

// cors middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://kevinam99:baloney5000@cluster0-f2cdt.gcp.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Connected to MongoDB!");
}).catch((error)=>{
    console.log("Mongo not connected");
    console.error(error);
});

const exerciseRouter = require('./routes/exercise');
const userRouter = require('./routes/users');

app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);

// start server
app.listen(port, () => {
    console.log("listening on port " + port);
})
