const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const controller = require('./controller')

// Controller imports and routes go here

app.listen(4000, () => console.log("Server running on 4000"));

app.post("/add-vehicle", controller.addvehicle)
/*
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const controller = require('./controller')

app.get("/api/compliment", controller.getCompliment);
app.get("/api/fortune", controller.getFortune);
app.get("/api/randomNumber", controller.getRandomNumber);
app.get("/api/review", controller.getReview);
app.listen(4000, () => console.log("Server running on 4000"));



*/