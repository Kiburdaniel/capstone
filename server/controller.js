let vehicles = [
  { tag: "9ABC123", expire: "2024-04-23" },
  { tag: "3XYZ876", expire: "2024-01-30" },
  { tag: "4xxy123", expire: "2025-02-20" },
  { tag: "5abc345", expire: "2025-06-15" },
  { tag: "taffsss", expire: "2025-01-17" },

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
