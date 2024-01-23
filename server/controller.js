let vehicles = [
  { tag: "9ABC123", expire: "April 23 2024" },
  { tag: "3XYZ876", expire: "January 30 2024" },
  { tag: "4xxy123", expire: "February 20 2025" },
  { tag: "5abc345", expire: "July 15, 2025" },

  // more vehicles...
];

module.exports = {
  addvehicle: (req, res) => {
    const tagNumber = req.body.tagNumber;
    const dueDate = req.body.dueDate;
    vehicles.push({ tag: tagNumber, expire: dueDate });
    res.status(200).send(vehicles);
  },
  getvehicles: (req, res) => {
    res.status(200).send(vehicles);
  },

  deleteVehicle: (req, res) => {
    let { tag } = req.params;
    let vehicleIndex = vehicles.findIndex((v) => v.tag === tag);
    if (vehicleIndex === -1) {
      res.status(400);
      return;
    }
    vehicles.splice(vehicleIndex, 1);
    res.status(200).send(vehicles);
  },
};
