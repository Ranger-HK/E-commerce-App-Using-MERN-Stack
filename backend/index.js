const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/db.js')
const app = express();
app.use(express.json());
const userRoute = require('./routes/UserRoute')
const adminRoute = require('./routes/AdminRoute')
const itemRoute = require('./routes/ItemRoute')
const orderRoute = require('./routes/OrderRoute')

dotenv.config();

connectDB(); //connecting database
const cors = require("cors")
app.use(cors());

//create port
const PORT = process.env.PORT

app.listen(
    PORT,
    console.log(
      `server running in port ${PORT}`.yellow.bold
    )
  )

app.use('/api/v1/',userRoute);
app.use('/api/v1/',adminRoute);
app.use('/api/v1/',itemRoute);
app.use('/api/v1/',orderRoute);
