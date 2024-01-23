let vehiclesForm = document.querySelector("#vehicle-form");
function addVehicles(e) {
  e.preventDefault();
  let tagNumber = document.querySelector("#tag-number").value;
  let dueDate = document.querySelector("#due-date").value;
  let body = { tagNumber, dueDate };
  console.log(body);
  const d = new Date(dueDate)
  console.log(d.getDate())
  axios
    .post("http://localhost:5501/add-vehicle", body)
    .then((res) => {
      let vehicles = res.data;
      renderVehicles(vehicles);
    })
    .catch((error) => console.log(error));
}
let vehiclesList = document.querySelector("#vehiclesList");
function getVehicles() {
  axios.get("http://localhost:5501/get-vehicles").then((res) => {
    let vehicles = res.data;
    renderVehicles(vehicles);
  });
}
vehiclesForm.addEventListener("submit", addVehicles);
//alert(vehicles[0].tag)

getVehicles();
function renderVehicles(array) {

  vehiclesList.innerHTML = "";
  array.forEach((v, index) => {

    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong >${v.tag}</strong> ${v.expire} 
        <button onclick="editVehicle(${index})">Edit</button>
        <button onclick="deleteVehicle('${v.tag}')">Delete</button>`;
    vehiclesList.appendChild(listItem);
  });
}
function deleteVehicle(tag) {
  axios.delete(`http://localhost:5501/delete/${tag}`).then((res) => {
    renderVehicles(res.data);
  });
}


function renderVehicles(array) {
  vehiclesList.innerHTML = "";
  array.forEach((v, index) => {
    let now = new Date();
    let d = new Date(v.expire)
    let inlineStyles
    if (now.getMonth() == d.getMonth()) {
      inlineStyles = 'color:red'
    } else {
      inlineStyles = 'color:black'
    }

    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong style="${inlineStyles}">${v.tag}</strong> ${v.expire} 
        <button onclick="editVehicle(${index})">Edit</button>
        <button onclick="deleteVehicle('${v.tag}')">Delete</button>`;
    vehiclesList.appendChild(listItem);
  });
}
