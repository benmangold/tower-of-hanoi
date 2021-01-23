const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(express.static("build"));
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

const gameState = {
  spireOne: [1, 2, 3, 4],
  spireTwo: [],
  spireThree: [],
};

app.get("/api/gameState", (req, res) => {
  console.log("GET gameState");
  res.send(JSON.stringify(gameState));
});

app.put("/api/spireOne/left", (req, res, next) => {
  console.log("PUT spireOne left");
  console.log(req.body);
  console.log(JSON.stringify(gameState));
  res.send(req.body);
});

app.put("/api/move", (req, res) => {
  console.log("PUT move");
  console.log(req.body);
  // const element =
});
