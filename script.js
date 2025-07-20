const apiKey = "38b50ce3d54acac8d271d93b";
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const resultDiv = document.getElementById("result");

let currencies = [];

const currencyListUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/codes`;

// Helper to get country code for flag based on currency code
function getCountryCodeForCurrency(currencyCode) {
  // Special cases
  if (currencyCode === "EUR") return "eu";  // European Union
  if (currencyCode === "GBP") return "gb";  // United Kingdom
  if (currencyCode === "USD") return "us";  // United States

  // Otherwise, guess from first two letters
  const guess = currencyCode.slice(0, 2).toLowerCase();
  return guess.length === 2 ? guess : "un"; // fallback "un" = unknown
}

// Load currencies and setup dropdowns
fetch(currencyListUrl)
  .then(res => res.json())
  .then(data => {
    currencies = data.supported_codes;
    createCustomDropdown("fromDropdown", fromCurrency);
    createCustomDropdown("toDropdown", toCurrency);

    // Set default values visually and in inputs
    fromCurrency.value = "USD";
    toCurrency.value = "EUR";
    updateSelected("fromDropdown", "USD");
    updateSelected("toDropdown", "EUR");
  })
  .catch(err => {
    resultDiv.textContent = "Failed to load currencies.";
    console.error(err);
  });

function createCustomDropdown(dropdownId, targetInput) {
  const dropdown = document.getElementById(dropdownId);

  const selected = document.createElement("div");
  selected.className = "selected-option";
  selected.tabIndex = 0; // accessibility

  const optionsList = document.createElement("div");
  optionsList.className = "options-list";

  currencies.forEach(currency => {
    const code = currency[0];
    const name = currency[1];
    const country = getCountryCodeForCurrency(code);

    const option = document.createElement("div");
    option.className = "option";
    option.innerHTML = `<img src="https://flagcdn.com/24x18/${country}.png" alt="${code} flag"> ${code} - ${name}`;

    option.addEventListener("click", () => {
      selected.innerHTML = `<img src="https://flagcdn.com/24x18/${country}.png" alt="${code} flag"> ${code}`;
      targetInput.value = code; // update hidden input value
      optionsList.style.display = "none";
    });

    optionsList.appendChild(option);
  });

  // Toggle dropdown visibility on click
  selected.addEventListener("click", () => {
    optionsList.style.display = optionsList.style.display === "flex" ? "none" : "flex";
  });

  // Close dropdown if clicking outside
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      optionsList.style.display = "none";
    }
  });

  dropdown.appendChild(selected);
  dropdown.appendChild(optionsList);
}

function updateSelected(dropdownId, code) {
  const dropdown = document.getElementById(dropdownId);
  const selected = dropdown.querySelector(".selected-option");
  const country = getCountryCodeForCurrency(code);
  selected.innerHTML = `<img src="https://flagcdn.com/24x18/${country}.png" alt="${code} flag"> ${code}`;
}

function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || amount <= 0) {
    resultDiv.textContent = "Please enter a valid amount.";
    return;
  }
  if (!from || !to) {
    resultDiv.textContent = "Please select both currencies.";
    return;
  }

  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.result === "success") {
        resultDiv.textContent = `${amount} ${from} = ${data.conversion_result.toFixed(4)} ${to}`;
      } else {
        resultDiv.textContent = "Conversion failed: " + (data["error-type"] || "Unknown error");
      }
    })
    .catch(err => {
      resultDiv.textContent = "Error fetching conversion rate.";
      console.error(err);
    });
}
