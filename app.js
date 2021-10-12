const express = require("express"); //improting createError for handling errors
const dotenv = require("dotenv"); //importing dotenv enviroment handle library
const mongoose = require("mongoose");

const createError = require("http-errors");
const cors = require("cors");
const ProductRoute = require("./Router/index");
dotenv.config(); //dotenv configure




const app = express(); //instance of express app
app.use(cors()); //allow CORS request
 //morgan module being used
app.use(express.json({ limit: "50mb" })); //using expressjs bodyparser for post request body
app.use(express.urlencoded({ extended: true, limit: "50mb" })); //extending the functionalities to url encoded data
require("events").EventEmitter.defaultMaxListeners = Infinity;

//Routes Listed Below
app.get("/",  async (req, res) => {
  try {
      res.status(200).send("hello")
      
  } catch (error) {
      
  }
});
app.use('/product',ProductRoute)

//if noting match url
app.use(async (req, res, next) => next(createError.NotFound()));

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

/*
Connectin Database & Starting Node Server 
*/
var CONNECTION_URL = process.env.DB_CONNECT;
const port = process.env.PORT || 4000; //Getting Free Port On Server If 3000 Is Not Available
mongoose.connect(
  CONNECTION_URL,
  {
    //Connecting To Mongo DB Database Before Starting Node Server
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
  },
  (err) => {
    if (err) console.log("Error Connecting DB", err);
    else console.log("DB Connected Succesfully");
  }
);

app.listen(port, () => console.log(`Server is running on PORT ${port}`));
