const apiKey = "38b50ce3d54acac8d271d93b";
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const resultDiv = document.getElementById("result");
const dailyRateDiv = document.getElementById("dailyRate");
const amountInput = document.getElementById("amount");
const swapBtn = document.getElementById("swapBtn");
const convertBtn = document.getElementById("convertBtn");
const offlineMsg = document.getElementById("offlineMsg");

const flagMap = {
  AED: "ae", AFN: "af", ALL: "al", AMD: "am", ANG: "sx", AOA: "ao", ARS: "ar",
  AUD: "au", AWG: "aw", AZN: "az", BAM: "ba", BBD: "bb", BDT: "bd", BGN: "bg",
  BHD: "bh", BIF: "bi", BMD: "bm", BND: "bn", BOB: "bo", BRL: "br", BSD: "bs",
  BTN: "bt", BWP: "bw", BYN: "by", BZD: "bz", CAD: "ca", CDF: "cd", CHF: "ch",
  CLP: "cl", CNY: "cn", COP: "co", CRC: "cr", CUC: "cu", CUP: "cu", CVE: "cv",
  CZK: "cz", DJF: "dj", DKK: "dk", DOP: "do", DZD: "dz", EGP: "eg", ERN: "er",
  ETB: "et", EUR: "eu", FJD: "fj", FKP: "fk", GBP: "gb", GEL: "ge", GHS: "gh",
  GIP: "gi", GMD: "gm", GNF: "gn", GTQ: "gt", GYD: "gy", HKD: "hk", HNL: "hn",
  HRK: "hr", HTG: "ht", HUF: "hu", IDR: "id", ILS: "il", INR: "in", IQD: "iq",
  IRR: "ir", ISK: "is", JMD: "jm", JOD: "jo", JPY: "jp", KES: "ke", KGS: "kg",
  KHR: "kh", KMF: "km", KPW: "kp", KRW: "kr", KWD: "kw", KYD: "ky", KZT: "kz",
  LAK: "la", LBP: "lb", LKR: "lk", LRD: "lr", LSL: "ls", LYD: "ly", MAD: "ma",
  MDL: "md", MGA: "mg", MKD: "mk", MMK: "mm", MNT: "mn", MOP: "mo", MRU: "mr",
  MUR: "mu", MVR: "mv", MWK: "mw", MXN: "mx", MYR: "my", MZN: "mz", NAD: "na",
  NGN: "ng", NIO: "ni", NOK: "no", NPR: "np", NZD: "nz", OMR: "om", PAB: "pa",
  PEN: "pe", PGK: "pg", PHP: "ph", PKR: "pk", PLN: "pl", PYG: "py", QAR: "qa",
  RON: "ro", RSD: "rs", RUB: "ru", RWF: "rw", SAR: "sa", SBD: "sb", SCR: "sc",
  SDG: "sd", SEK: "se", SGD: "sg", SHP: "sh", SLL: "sl", SOS: "so", SRD: "sr",
  SSP: "ss", STN: "st", SYP: "sy", SZL: "sz", THB: "th", TJS: "tj", TMT: "tm",
  TND: "tn", TOP: "to", TRY: "tr", TTD: "tt", TWD: "tw", TZS: "tz", UAH: "ua",
  UGX: "ug", USD: "us", UYU: "uy", UZS: "uz", VES: "ve", VND: "vn", VUV: "vu",
  WST: "ws", XAF: "cm", XCD: "ag", XDR: "un", XOF: "sn", XPF: "pf", YER: "ye",
  ZAR: "za", ZMW: "zm", ZWL: "zw", BTC: "un", ETH: "un", LTC: "un",
};

const symbolMap = {
  USD: "$", EUR: "€", GBP: "£", JPY: "¥", CAD: "CA$", AUD: "A$", CNY: "¥",
  INR: "₹", RWF: "FRw", KES: "KSh", ZAR: "R", NGN: "₦", GHS: "GH₵", TZS: "TSh",
  UGX: "USh", EGP: "£", MAD: "MAD", CHF: "CHF", SEK: "kr", NOK: "kr", DKK: "kr",
  NZD: "NZ$", SGD: "S$", HKD: "HK$", MYR: "RM", THB: "฿", IDR: "Rp", PHP: "₱",
  KRW: "₩", BRL: "R$", MXN: "$", RUB: "₽", TRY: "₺", SAR: "﷼", AED: "د.إ",
  ILS: "₪", PLN: "zł", CZK: "Kč", HUF: "Ft", CLP: "$", COP: "$", ARS: "$",
  VND: "₫", BTC: "₿", XAU: "Au", XAG: "Ag", XPT: "Pt", XPD: "Pd",
};

let currencies = [];

const currencyListUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/codes`;

// Load currencies and setup dropdowns
fetch(currencyListUrl)
  .then((res) => res.json())
  .then((data) => {
    currencies = data.supported_codes;
    createCustomDropdown("fromDropdown", fromCurrency);
    createCustomDropdown("toDropdown", toCurrency);

    fromCurrency.value = "USD";
    toCurrency.value = "EUR";
    updateSelected("fromDropdown", "USD");
    updateSelected("toDropdown", "EUR");
  })
  .catch((err) => {
    resultDiv.textContent = "Failed to load currencies.";
    console.error(err);
  });

function createCustomDropdown(dropdownId, targetInput) {
  const dropdown = document.getElementById(dropdownId);
  dropdown.innerHTML = "";

  const selected = document.createElement("div");
  selected.className = "selected-option";
  selected.tabIndex = 0;
  selected.setAttribute("aria-haspopup", "listbox");
  selected.setAttribute("aria-expanded", "false");

  selected.innerHTML = "Select Currency";

  const optionsList = document.createElement("div");
  optionsList.className = "options-list";
  optionsList.setAttribute("role", "listbox");

  // Search input for filtering
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search...";
  searchInput.className = "search-input";
  searchInput.style.cssText = `
    width: 90%;
    margin: 5px auto 10px auto;
    display: block;
    padding: 6px 10px;
    border-radius: 6px;
    border: none;
    background-color: #444;
    color: #eee;
    font-size: 14px;
  `;
  optionsList.appendChild(searchInput);

  // Create option elements
  function renderOptions(filter = "") {
    // Remove all but the search input before re-adding filtered options
    while (optionsList.childElementCount > 1) {
      optionsList.removeChild(optionsList.lastChild);
    }
    const filtered = currencies.filter(([code, name]) => {
      const text = `${code} ${name}`.toLowerCase();
      return text.includes(filter.toLowerCase());
    });

    filtered.forEach(([code, name]) => {
      const country = flagMap[code] || "un";

      const option = document.createElement("div");
      option.className = "option-item";
      option.setAttribute("role", "option");
      option.tabIndex = 0;
      option.innerHTML = `<img src="https://flagcdn.com/24x18/${country}.png" alt="Flag of ${code}" /> ${code} - ${name}`;

      option.addEventListener("click", () => {
        selected.innerHTML = `<img src="https://flagcdn.com/24x18/${country}.png" alt="Flag of ${code}"/> ${code}`;
        optionsList.style.display = "none";
        selected.setAttribute("aria-expanded", "false");
        targetInput.value = code;

        // Convert if amount present for better UX
        if (amountInput.value > 0) convertCurrency();
        showDailyRate(code, dropdownId === "fromDropdown" ? toCurrency.value : fromCurrency.value);
      });

      // Allow keyboard selection
      option.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          option.click();
        }
      });

      optionsList.appendChild(option);
    });
  }

  // Initial render
  renderOptions();

  searchInput.addEventListener("input", (e) => {
    renderOptions(e.target.value);
  });

  selected.addEventListener("click", () => {
    if (optionsList.style.display === "flex") {
      optionsList.style.display = "none";
      selected.setAttribute("aria-expanded", "false");
    } else {
      optionsList.style.display = "flex";
      selected.setAttribute("aria-expanded", "true");
      searchInput.focus();
    }
  });

  // Close dropdown if clicked outside
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      optionsList.style.display = "none";
      selected.setAttribute("aria-expanded", "false");
    }
  });

  dropdown.appendChild(selected);
  dropdown.appendChild(optionsList);
}

function updateSelected(dropdownId, code) {
  const dropdown = document.getElementById(dropdownId);
  const selected = dropdown.querySelector(".selected-option");
  const country = flagMap[code] || "un";
  selected.innerHTML = `<img src="https://flagcdn.com/24x18/${country}.png" alt="Flag of ${code}" /> ${code}`;
}

// Swap currencies button functionality
swapBtn.addEventListener("click", () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;

  updateSelected("fromDropdown", fromCurrency.value);
  updateSelected("toDropdown", toCurrency.value);

  if (amountInput.value > 0) {
    convertCurrency();
    showDailyRate(fromCurrency.value, toCurrency.value);
  }
});

// Convert button click handler
convertBtn.addEventListener("click", () => {
  convertCurrency();
  showDailyRate(fromCurrency.value, toCurrency.value);
});

async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || amount <= 0) {
    resultDiv.textContent = "Please enter a valid amount.";
    dailyRateDiv.textContent = "";
    return;
  }

  // Show loading state
  resultDiv.innerHTML = `<span class="loading-spinner"></span> Converting...`;
  convertBtn.disabled = true;
  swapBtn.disabled = true;

  try {
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.result === "success") {
      const fromSymbol = symbolMap[from] || "";
      const toSymbol = symbolMap[to] || "";

      // Flag images for from/to
      const fromFlag = flagMap[from] || "un";
      const toFlag = flagMap[to] || "un";

      resultDiv.innerHTML = `
        <div style="display:flex; justify-content:center; align-items:center; gap:10px;">
          <div><img src="https://flagcdn.com/24x18/${fromFlag}.png" alt="Flag of ${from}" /> ${fromSymbol}${amount.toFixed(2)} ${from}</div>
          <div>➡️</div>
          <div><img src="https://flagcdn.com/24x18/${toFlag}.png" alt="Flag of ${to}" /> ${toSymbol}${data.conversion_result.toFixed(2)} ${to}</div>
        </div>
      `;
    } else {
      resultDiv.textContent = "Conversion failed: " + (data["error-type"] || "Unknown error");
    }
  } catch (err) {
    resultDiv.textContent = "Error fetching conversion rate.";
    console.error(err);
  } finally {
    convertBtn.disabled = false;
    swapBtn.disabled = false;
  }
}

// Show daily exchange rate
function showDailyRate(from, to) {
  dailyRateDiv.textContent = "Loading daily rates...";
  // Fetch live rate only (free tier limitation)
  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`)
    .then(res => res.json())
    .then(data => {
      if (data.result !== "success") {
        dailyRateDiv.textContent = "";
        return;
      }
      dailyRateDiv.textContent = `1 ${from} = ${data.conversion_rate.toFixed(4)} ${to} (Live rate)`;
    })
    .catch(() => {
      dailyRateDiv.textContent = "";
    });
}

// Offline/online detection
function updateOnlineStatus() {
  if (navigator.onLine) {
    offlineMsg.style.display = "none";
    convertBtn.disabled = false;
    swapBtn.disabled = false;
  } else {
    offlineMsg.style.display = "block";
    convertBtn.disabled = true;
    swapBtn.disabled = true;
  }
}

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);
window.onload = () => {
  updateOnlineStatus();
  showDailyRate(fromCurrency.value, toCurrency.value);
};
