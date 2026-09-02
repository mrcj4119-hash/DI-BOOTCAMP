
const billAmountInput = document.getElementById("billAmt");
const serviceQualityInput = document.getElementById("serviceQual");
const numberOfPeopleInput = document.getElementById("numOfPeople");
const calculateBtn = document.getElementById("calculate");
const totalTip = document.getElementById("totalTip");
const tipDisplay = document.getElementById("tip");

function calculateTip() {
  const billAmount = Number(billAmountInput.value);
  const serviceQuality = Number(serviceQualityInput.value);
  let numberOfPeople = Number(numberOfPeopleInput.value);

  if (serviceQuality === 0 || billAmountInput.value === "") {
    alert("Please enter the bill amount and service quality.");
    return;
  }

  if (numberOfPeopleInput.value === "" || numberOfPeople < 1) {
    numberOfPeople = 1;
    numberOfPeopleInput.value = 1;
    document.getElementById("each")?.style.setProperty("display", "none");
  }

  const total = (billAmount * serviceQuality) / numberOfPeople;
  const roundedTotal = total.toFixed(2);

  totalTip.style.display = "block";
  tipDisplay.textContent = roundedTotal;
}

if (calculateBtn) {
  calculateBtn.onclick = calculateTip;
}

const emailForm = document.getElementById("emailForm");
const emailInput = document.getElementById("email");

function isValidEmailWithoutRegex(email) {
  if (!email.includes("@")) return false;

  const atIndex = email.indexOf("@");
  const dotIndex = email.lastIndexOf(".");

  if (atIndex <= 0 || dotIndex <= atIndex + 1 || dotIndex === email.length - 1) {
    return false;
  }

  return true;
}

function isValidEmailWithRegex(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (emailForm) {
  emailForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();

    if (isValidEmailWithRegex(email)) {
      alert("Valid email address");
    } else {
      alert("Invalid email address");
    }
  });
}

const getLocationBtn = document.getElementById("getLocation");
const locationResult = document.getElementById("locationResult");

if (getLocationBtn) {
  getLocationBtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
      locationResult.textContent = "Geolocation is not supported by your browser.";
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        locationResult.textContent = `Latitude: ${lat}\nLongitude: ${lon}`;
      },
      () => {
        locationResult.textContent = "Unable to get your location.";
      }
    );
  });
}
