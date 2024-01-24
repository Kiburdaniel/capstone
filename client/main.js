let vehiclesForm = document.querySelector("#vehicle-form");
function addVehicles(e) {
  e.preventDefault();
  let tagNumber = document.querySelector("#tag-number").value;
  let dueDate = document.querySelector("#due-date").value;
  let img = document.querySelector("#carImg");
  let body = { tagNumber, dueDate, img };
  console.log(body);

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

//let editButton = document.querySelector("#editVehicle");
const editButton = document.getElementById("editButton");
function editVehicle() {
  let tag = document.querySelector("#TagNo").value;
  let dueDate = document.querySelector("#dueDate").value;
  let body = { tag, dueDate };
  console.log(body);
  axios.put("http://localhost:5501/editVehicle", body).then((res) => {
    let vehicles = res.data;
    console.log(vehicles);
    renderVehicles(vehicles);
  });
}

vehiclesForm.addEventListener("submit", addVehicles);
editButton.addEventListener("click", editVehicle);

//editButton.addEventListener("click", editVehicle);
//alert(vehicles[0].tag)
//Use addEventListener to call the editVehicle function when the button is clicked
getVehicles();
function renderVehicles(array) {
  vehiclesList.innerHTML = "";
  array.forEach((v, index) => {
    const listItem = document.createElement("div");
    listItem.innerHTML = `<div class="card" style="width: 18rem;">
    <img src=${v.img} class="card-img-top img-fluid img-thumbnail "></img>
    <div class="card-body">
      <h5 class="card-title">Vehicle Tag: ${v.tag}</h5>
      <p class="card-text">${v.expire}</p>
      <a href="#" class="btn btn-danger" onclick= "deleteVehicle('${v.tag}')">Delete</a>
    </div>
  </div>`;
    vehiclesList.appendChild(listItem);
  });
}
function deleteVehicle(tag) {
  axios.delete(`http://localhost:5501/delete/${tag}`).then((res) => {
    renderVehicles(res.data);
  });
  console.log(deleteVehicle);
}
