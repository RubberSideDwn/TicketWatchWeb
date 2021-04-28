const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const cors = require("cors");
router.use(cors());

const { v4: uuidv4 } = require("uuid");
const phoneRegex = /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g;

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
const fullPath = path.join(__dirname, "../assets/data/warehouses.json");
const fullPathInventory = path.resolve(
  __dirname,
  "../assets/data/inventories.json"
);

router.get("/", (req, res) => {
  const warehouseList = fs.readFileSync(fullPath, "utf8");
  res.json(JSON.parse(warehouseList));
});

//Post to add new warehouse..
router.post("/", (req, res) => {
  const { name, address, city, contact } = req.body;
  const { name: contactName, position, phone, email } = contact;

  if (
    !name ||
    !address ||
    !phone ||
    !email ||
    !city ||
    !contactName ||
    !position
  ) {
    res.status(400).send({ error: "Missing required data" });
  }

  const phoneNumber = phone.match(phoneRegex);
  if (!phoneNumber)
    res.status(400).send({ error: "Phone number format is not valid" });

  const emailValid = validateEmail(email);

  if (!emailValid) res.status(400).send({ error: "Email is not valid" });

  const id = uuidv4();

  const warehouseList = fs.readFileSync(fullPath, "utf8");
  const w = JSON.parse(warehouseList);
  const newWarehouse = {
    id,
    name,
    address,
    city,
    contact: {
      name: contactName,
      position,
      phone,
      email,
    },
  };
  w.push(newWarehouse);

  fs.writeFileSync(fullPath, JSON.stringify(w));
  console.log("Warehouse added");
  res.json({ status: "Warehouse entry successful" });
});

router.get("/:id", (request, response) => {
  const warehouseList = JSON.parse(fs.readFileSync(fullPath));
  const warehouse = warehouseList.find(
    (warehouse) => warehouse.id === request.params.id
  );

  const inventoryList = JSON.parse(fs.readFileSync(fullPathInventory));

  const inventory = inventoryList.filter(
    (inventory) => inventory.warehouseID === warehouse.id
  );

  response.json({ warehouse, inventory });
});

//PUT request by id
router.put("/:id", (req, res) => {
  //GET array of warehouses
  const warehouseList = JSON.parse(fs.readFileSync(fullPath));
  //GET specific warehouse to update
  const warehouse = warehouseList.find(
    (warehouse) => warehouse.id === req.params.id
  );
  //GET the index position of the warehouse we are going to update
  const indexToReplace = warehouseList.findIndex(
    (item) => item.id === warehouse.id
  );
  //UPDATE the specific warehouse
  const updates = Object.keys(req.body);
  updates.forEach((update) => (warehouse[update] = req.body[update]));

  //FIND and REPLACE the specific warehouse with the UPDATED values.
  warehouseList.splice(indexToReplace, 1, warehouse);

  //SAVE the updates to the JSON file.
  fs.writeFileSync(fullPath, JSON.stringify(warehouseList));

  //RESPOND to the client with the updates.
  res.json(warehouse);
});

//DELETE warehouse by id
router.delete("/:id", (req, res) => {
  const warehousesId = req.params.id;
  const warehousesList = fs.readFileSync(fullPath, "utf8");
  const warehousesArray = JSON.parse(warehousesList);
  const warehousesItem = warehousesArray.filter((item) => {
    return item.id !== warehousesId;
  });
  fs.writeFileSync(fullPath, JSON.stringify(warehousesItem));

  res.json({ message: "Your selected warehouse item has been deleted." });
});

module.exports = router;
