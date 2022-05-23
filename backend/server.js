const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
require("dotenv").config();

// require routes
const user = require('./routes/user')
const product = require('./routes/product')
const category = require('./routes/category')


const app = express();

if(process.env.NODE_ENV === "development") {
  app.use(morgan('dev'))
}

// static files
app.use(express.static("public"));
// external middlewares
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(fileUpload())
// express body parser
app.use(express.json());

// routes middleware
app.use('/auth', user)
app.use('/product', product)
app.use('/category', category)



const PORT = process.env.PORT || 5000;
// listen to a port
app.listen(PORT, () =>
  console.log(
    `server up and running on ${process.env.NODE_ENV} MODE at ${PORT}`
  )
);
