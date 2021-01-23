const express = require('express')
const app = express()
const port = 3000

app.use(express.static('build'))
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})

const gameState = {
    sprireOne: [1, 2, 3, 4],
    spireTwo: [],
    spireThree: []
};

app.put('/api/spireOne/left', (req, res, next) => {
    console.log(req.body)
    res.send(req.body)
})