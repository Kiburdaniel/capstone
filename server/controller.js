let vehicles = [
  {
    tag: "9ABC123",
    expire: "2024-04-23",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQys1MdspM2aUI4ELlxX9elx53B2_75uNlTdA&usqp=CAU",
  },
  {
    tag: "3XYZ876",
    expire: "2024-01-30",
    img: "https://vexgateway.fastly.carvana.io/executions/100687874/FLOOR_CLEANER/cleaned/clean_008.jpg?v=1701883574.761&dpr=2&optimize=low&width=1200",
  },
  {
    tag: "4xxy123",
    expire: "2025-02-20",
    img: "https://s7d1.scene7.com/is/image/scom/RCK_handrail?$150wa$",
  },
  {
    tag: "5abc345",
    expire: "2025-06-15",
    img: "https://media.gettyimages.com/id/1457020930/photo/100th-european-motor-show.jpg?s=612x612&w=gi&k=20&c=bul2ZaxZ_VC8DYjuwwCzi-FArXAe_w8MJU9EA6TzhCY=",
  },
  {
    tag: "taffsss",
    expire: "2025-01-17",
    img: "https://build.ford.com/dig/Ford/Bronco/2024/HD-FULL%5BEXTBCK1%5D/Image%5B%7CFord%7CBronco%7C2024%7C1%7C1.%7C312A.E8B..PE7..887.89V.65H.43E.574.18D.4DR.64F.TFV.60R.ESO.X73.99H.50A.67X.59A.65P.58Z.SRS.17Q.65F.91S.ORB.44T.65C.LTV.%5D/EXT/4/vehicle.png",
  },
];

vehicles = vehicles.sort((a, b) => {
  const dateA = new Date(a.expire);
  const dateB = new Date(b.expire);

  return dateA - dateB;
});

module.exports = {
  addvehicle: (req, res) => {
    const tagNumber = req.body.tagNumber;
    const dueDate = req.body.dueDate;
    const img = req.body.img;
    vehicles.push({
      tag: tagNumber,
      expire: dueDate,
      img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRpEKVWEYjDWrUjp9pNM8wSeEFljvNL-N579_B_pvN1fZLuob9o",
    });
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

  editVehicle: (req, res) => {
    const tag = req.body.tag;
    const dueDate = req.body.dueDate;
    console.log(req.body);
    let vehicleIndex = vehicles.findIndex((v) => v.tag === tag);
    if (vehicleIndex === -1) {
      res.status(400);
      return;
    }
    vehicles[vehicleIndex].expire = dueDate;

    res.status(200).send(vehicles);
  },
}
