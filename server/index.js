const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const controller = require("./controller");

// Controller imports and routes go here

app.listen(5501, () => console.log("Server running on 5501"));

app.post("/add-vehicle", controller.addvehicle);
app.get("/get-vehicles", controller.getvehicles);
app.delete("/delete/:tag", controller.deleteVehicle);
app.put("/editVehicle/tag", controller.editVehicle);
