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
  0: [1, 2, 3, 4],
  1: [],
  2: [],
};

let players = 0;

app.get("/api/initState", (req, res) => {
  console.log("GET gameState");
  const initState = gameState;
  initState.playerId = players;
  players++;
  console.log(JSON.stringify(initState));
  res.send(JSON.stringify(initState));
});

app.get("/api/gameState", (req, res) => {
  res.send(JSON.stringify(gameState));
});

// move a stone from selectedSpire to targetSpire
app.put("/api/move", (req, res) => {
  console.log("PUT move");
  console.log(req.body);

  const { selectedSpire, targetSpire } = req.body;
  const element = gameState[selectedSpire].pop();
  element ? gameState[targetSpire].push(element) : null;

  console.log(JSON.stringify(gameState));
  res.send(JSON.stringify(gameState));
});
