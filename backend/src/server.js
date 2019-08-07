const express = require("express");
const server = express();
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
mongoose.connect(
  "mongodb+srv://omnistack:omnistack@cluster0-njsfy.mongodb.net/omnistack8?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3334);
