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

getVehicles();
function renderVehicles(array) {
  vehiclesList.innerHTML = "";
  array.forEach((v, index) => {

    let now = new Date();
    let d = new Date(v.expire)
    let inlineStyles
    if (now.getMonth() == d.getMonth() && now.getFullYear() == d.getFullYear()) {
      inlineStyles = 'color:red; background-color:yellow;'
    } else {
      inlineStyles = 'color:black'
    }

    const listItem = document.createElement("div");
    listItem.innerHTML = `
    <div class="container d-flex justify-content-between">
      <div class="col-md-4 mb-3">
        <div class="card" style="width: 18rem;">
          <img src=${v.img} class="card-img-top img-fluid img-thumbnail"></img>
          <div class="card-body">
            <h5 class="card-title" style="${inlineStyles}">Vehicle Tag: ${v.tag}</h5>
            <p class="card-text">${v.expire}</p>
            <a href="#" class="btn btn-secondary" onclick= "editVehicle('${index}')">Edit</a>
            <a href="#" class="btn btn-danger" onclick= "deleteVehicle('${v.tag}')">Delete</a>
          </div>
        </div>
      </div>
    </div>
    `;
    vehiclesList.appendChild(listItem);
  });
}
function deleteVehicle(tag) {
  axios.delete(`http://localhost:5501/delete/${tag}`).then((res) => {
    renderVehicles(res.data);
  });
  console.log(deleteVehicle);
}

function editVehicle(index) {
  axios.get("http://localhost:5501/get-vehicles").then((res) => {
    let vehicles = res.data;
    //renderVehicles(vehicles);
    let tagInput = document.getElementById('TagNo')
    tagInput.value = vehicles[index].tag

    let exDate = document.getElementById('dueDate')
    exDate.value = vehicles[index].expire

    let hiddenIndex = document.getElementById('hiddenIndex')
    hiddenIndex.value = index

  });


}

function saveEditedVehicle() {
  axios.get("http://localhost:5501/get-vehicles").then((res) => {
    let vehicles = res.data;
    let tagInput = document.getElementById('TagNo').value
    let exDate = document.getElementById('dueDate').value
    let hiddenIndex = document.getElementById('hiddenIndex').value

    vehicles[hiddenIndex].tag = tagInput
    vehicles[hiddenIndex].expire = exDate
    renderVehicles(vehicles);

  });

}
