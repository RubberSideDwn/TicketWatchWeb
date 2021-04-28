const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fullPath = path.join(__dirname, "../assets/data/garage.json");
let idGen = uuidv4();

router.get("/", (req, res) => {
    const inventoriesList = fs.readFileSync(fullPath, "utf8");
    res.json(JSON.parse(myGarage));
});

router.post("/addnewitem", (req, res) => {
const newVehicle = {
    id: idGen,
    vehName: req.body.vehName,
    plate: req.body.plate,
    state: req.body.state,
}
});

module.exports = router;