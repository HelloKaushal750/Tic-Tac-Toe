const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const { connection } = require("./config/db");
require("dotenv").config();
const { GameController } = require("./controller/Game.controller");

const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use(cors());

app.use("/", GameController);

const port = process.env.PORT;

connection.then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
