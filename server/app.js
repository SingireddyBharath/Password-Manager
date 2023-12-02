const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptionsDelegate = function (req, callback) {
  const allowedOrigins = [
    "http://localhost:3000",
    "https://password-manager-5pvr.onrender.com",
  ];
  let corsOptions;
  if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
    // Enable CORS for this request
    corsOptions = { origin: true, credentials: true };
  } else {
    // Disable CORS for this request
    corsOptions = { origin: false };
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));
app.use(cookieParser());

// SETTING UP DOTENV
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 8000;

// CONNECTING WITH DATABASE
require("./db/connection");

app.use(express.json());

// LINKING THE ROUTER FILES
app.use(require("./router/routing"));

// LISTENING TO PORT
app.listen(PORT, () => {
  console.log(`listening to port : http://localhost:${PORT}/`);
});
