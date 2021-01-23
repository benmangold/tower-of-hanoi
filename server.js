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
  0: [4, 3, 2, 1],
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
  console.log(`PUT move ${req.body}`);

  let error = false;

  const { selectedSpire, targetSpire } = req.body;

  // validate move

  const selectedSpireLength = gameState[selectedSpire].length;
  const selectedSpireTopStone =
    gameState[selectedSpire][selectedSpireLength - 1];
  console.log(`Selected spire top stone ${selectedSpireTopStone}`);

  let targetSpireTopStone = null;
  const targetSpireLength = gameState[targetSpire].length;
  targetSpireLength != 0
    ? (targetSpireTopStone = gameState[targetSpire][targetSpireLength - 1])
    : null;

  console.log(`Target Spire top stone ${targetSpireTopStone}`);

  // bad move if selected spire is empty
  if (selectedSpireLength == 0) {
    error = true;
    res.status(400).send(JSON.stringify({ error: "Selected Spire is Empty!" }));
  }

  // bad move if target and selected are the same
  if (selectedSpire == targetSpire) {
    error = true;
    res
      .status(400)
      .send(JSON.stringify({ error: "Must target a different Spire!" }));
  }

  // bad move if target spire has smaller stone on top
  if (targetSpireTopStone && targetSpireTopStone < selectedSpireTopStone) {
    error = true;
    res
      .status(400)
      .send(
        JSON.stringify({ error: "Cannot move a stone on top of smaller stone" })
      );
  }

  if (!error) {
    const element = gameState[selectedSpire].pop();
    element ? gameState[targetSpire].push(element) : null;

    console.log(JSON.stringify(gameState));
    res.send(JSON.stringify(gameState));
  }
});
