const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const path = require("path");
const router = require('./routes/garage');
const app = express();
const { v4: uuidv4 } = require("uuid");


//sets garage location
const garagePath = path.join(__dirname, "../client/src/assets/data/garage.json");

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/api/garage', (req, res) => {
  const garage = fs.readFileSync(garagePath, "utf8");
  res.json(JSON.parse(garage));
});

app.post("/api/garage", (req, res) => {
  const garage = fs.readFileSync(garagePath, "utf8");
  const {name, plate, state } = req.body;
  const w = JSON.parse(garage);
  const id = uuidv4();
  const newVeh = {
    id,
    name,
    plate,
    state,
  };
  w.push(newVeh);
  fs.writeFileSync(garagePath, JSON.stringify(w));
  console.log("vehicle added");
  res.json({ status: "vehicle entry successful"});
});

// listen for requests
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});