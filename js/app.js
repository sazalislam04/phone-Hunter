const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = "";
  //   display 10 phones only
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  //   not found message
  const phoneNotFound = document.getElementById("phone-not-found");
  if (phones.length === 0) {
    phoneNotFound.classList.remove("d-none");
  } else {
    phoneNotFound.classList.add("d-none");
  }

  phones.forEach((phone) => {
    const { image, brand, phone_name, slug } = phone;
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card p-4">
    <img src="${image}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${phone_name}</h5>
      <p class="card-text">${brand}</p>
      <button onclick="phoneDetails('${slug}')" class="btn btn-primary" data-bs-toggle="modal"
      data-bs-target="#phoneDetail">Phone Details</button>
    </div>
  </div>
    `;
    phonesContainer.appendChild(phoneDiv);
  });
  // stop spinner or loader
  displayLoader(false);
};

// search all data common function
const processSearch = (dataLimit) => {
  // start spinner or loader
  displayLoader(true);
  const inputField = document.getElementById("input-field");
  const searchText = inputField.value;
  loadPhones(searchText, dataLimit);
  //   inputField.value = "";
};

document.getElementById("search-btn").addEventListener("click", function () {
  //   search data
  processSearch(10);
});

document
  .getElementById("input-field")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      processSearch(10);
    }
  });

const displayLoader = (isLoader) => {
  const loader = document.getElementById("loader");
  if (isLoader) {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
  }
};

document.getElementById("show-all-btn").addEventListener("click", function () {
  processSearch();
});

const phoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = (phone) => {
  // console.log(phone);
  const { brand, image, mainFeatures, name, releaseDate, others } = phone;
  const { chipSet, displaySize, memory, sensors, storage } = mainFeatures;
  const { Bluetooth, GPS, NFC, Radio, USB, WLAN } = others;
  // const [] = ["Face ID", "accelerometer", "gyro", "proximity", "compass", "barometer"]
  const phoneName = document.getElementById("phone-name");
  phoneName.innerHTML = `
  <div class="modal-content">
  <div class="modal-header">
    <h5 class="modal-title" id="phoneDetail">${name}</h5>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="modal"
      aria-label="Close"
    ></button>
  </div>
  <div class="modal-body">
    <div class="text-center">
    <img src="${image}">
    </div>
      <div class="text-center">
      <h5 class="mt-3">Brand: ${brand}</h5>
      <p>ReleaseDate: ${releaseDate ? Date() : "N/a"}</p>
      </div>
    <div>
        <h6>DisplaySize: <span class="text-secondary">${displaySize}</span></h6>
        <h6>Storage: <span class="text-secondary">${storage}</span></h6>
        <h6>Memory: <span class="text-secondary">${memory}</span></h6>
        <h6>ChipSet: <span class="text-secondary">${chipSet}</span></h6>
        <h6>Sensors: <span class="text-secondary">${
          sensors ? sensors.map((sensor) => sensor) : "N/a"
        }</span></h6>
        <h6>Bluetooth: <span class="text-secondary">${
          Bluetooth ? Bluetooth : "N/a"
        }</span></h6>
        <h6>GPS: <span class="text-secondary">${GPS ? GPS : "N/a"}</span></h6>
        <h6>NFC: <span class="text-secondary">${NFC ? NFC : "N/a"}</span></h6>
        <h6>Radio: <span class="text-secondary">${
          Radio ? Radio : "N/a"
        }</span></h6>
        <h6>USB: <span class="text-secondary">${USB ? USB : "N/a"}</span></h6>
        <h6>WLAN: <span class="text-secondary">${
          WLAN ? WLAN : "N/a"
        }</span></h6>
    </div>
  </div>
  <div class="modal-footer">
    <button
      type="button"
      class="btn btn-secondary"
      data-bs-dismiss="modal"
    >
      Close
    </button>
  </div>
</div>
  `;
};

loadPhones("iphone");
