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
  AED: "ae", // United Arab Emirates dirham
  AFN: "af", // Afghanistan afghani
  ALL: "al", // Albania lek
  AMD: "am", // Armenia dram
  ANG: "sx", // Netherlands Antillean guilder (Sint Maarten flag)
  AOA: "ao", // Angola kwanza
  ARS: "ar", // Argentina peso
  AUD: "au", // Australia dollar
  AWG: "aw", // Aruba florin
  AZN: "az", // Azerbaijan manat
  BAM: "ba", // Bosnia and Herzegovina konvertibilna marka
  BBD: "bb", // Barbados dollar
  BDT: "bd", // Bangladesh taka
  BGN: "bg", // Bulgaria lev
  BHD: "bh", // Bahrain dinar
  BIF: "bi", // Burundi franc
  BMD: "bm", // Bermuda dollar
  BND: "bn", // Brunei dollar
  BOB: "bo", // Bolivia boliviano
  BRL: "br", // Brazil real
  BSD: "bs", // Bahamas dollar
  BTN: "bt", // Bhutan ngultrum
  BWP: "bw", // Botswana pula
  BYN: "by", // Belarus ruble
  BZD: "bz", // Belize dollar
  CAD: "ca", // Canada dollar
  CDF: "cd", // Congo franc
  CHF: "ch", // Switzerland franc
  CLP: "cl", // Chile peso
  CNY: "cn", // China yuan
  COP: "co", // Colombia peso
  CRC: "cr", // Costa Rica colon
  CUC: "cu", // Cuba convertible peso (same flag as Cuba)
  CUP: "cu", // Cuba peso
  CVE: "cv", // Cape Verde escudo
  CZK: "cz", // Czech koruna
  DJF: "dj", // Djibouti franc
  DKK: "dk", // Denmark krone
  DOP: "do", // Dominican peso
  DZD: "dz", // Algeria dinar
  EGP: "eg", // Egypt pound
  ERN: "er", // Eritrea nakfa
  ETB: "et", // Ethiopia birr
  EUR: "eu", // Euro (European Union flag)
  FJD: "fj", // Fiji dollar
  FKP: "fk", // Falkland Islands pound
  GBP: "gb", // United Kingdom pound sterling
  GEL: "ge", // Georgia lari
  GHS: "gh", // Ghana cedi
  GIP: "gi", // Gibraltar pound
  GMD: "gm", // Gambia dalasi
  GNF: "gn", // Guinea franc
  GTQ: "gt", // Guatemala quetzal
  GYD: "gy", // Guyana dollar
  HKD: "hk", // Hong Kong dollar
  HNL: "hn", // Honduras lempira
  HRK: "hr", // Croatia kuna
  HTG: "ht", // Haiti gourde
  HUF: "hu", // Hungary forint
  IDR: "id", // Indonesia rupiah
  ILS: "il", // Israel new shekel
  INR: "in", // India rupee
  IQD: "iq", // Iraq dinar
  IRR: "ir", // Iran rial
  ISK: "is", // Iceland krona
  JMD: "jm", // Jamaica dollar
  JOD: "jo", // Jordan dinar
  JPY: "jp", // Japan yen
  KES: "ke", // Kenya shilling
  KGS: "kg", // Kyrgyzstan som
  KHR: "kh", // Cambodia riel
  KMF: "km", // Comoros franc
  KPW: "kp", // North Korea won
  KRW: "kr", // South Korea won
  KWD: "kw", // Kuwait dinar
  KYD: "ky", // Cayman Islands dollar
  KZT: "kz", // Kazakhstan tenge
  LAK: "la", // Laos kip
  LBP: "lb", // Lebanon pound
  LKR: "lk", // Sri Lanka rupee
  LRD: "lr", // Liberia dollar
  LSL: "ls", // Lesotho loti
  LYD: "ly", // Libya dinar
  MAD: "ma", // Morocco dirham
  MDL: "md", // Moldova leu
  MGA: "mg", // Madagascar ariary
  MKD: "mk", // North Macedonia denar
  MMK: "mm", // Myanmar kyat
  MNT: "mn", // Mongolia tugrik
  MOP: "mo", // Macau pataca
  MRU: "mr", // Mauritania ouguiya
  MUR: "mu", // Mauritius rupee
  MVR: "mv", // Maldives rufiyaa
  MWK: "mw", // Malawi kwacha
  MXN: "mx", // Mexico peso
  MYR: "my", // Malaysia ringgit
  MZN: "mz", // Mozambique metical
  NAD: "na", // Namibia dollar
  NGN: "ng", // Nigeria naira
  NIO: "ni", // Nicaragua córdoba
  NOK: "no", // Norway krone
  NPR: "np", // Nepal rupee
  NZD: "nz", // New Zealand dollar
  OMR: "om", // Oman rial
  PAB: "pa", // Panama balboa
  PEN: "pe", // Peru sol
  PGK: "pg", // Papua New Guinea kina
  PHP: "ph", // Philippines peso
  PKR: "pk", // Pakistan rupee
  PLN: "pl", // Poland zloty
  PYG: "py", // Paraguay guarani
  QAR: "qa", // Qatar riyal
  RON: "ro", // Romania leu
  RSD: "rs", // Serbia dinar
  RUB: "ru", // Russia ruble
  RWF: "rw", // Rwanda franc
  SAR: "sa", // Saudi Arabia riyal
  SBD: "sb", // Solomon Islands dollar
  SCR: "sc", // Seychelles rupee
  SDG: "sd", // Sudan pound
  SEK: "se", // Sweden krona
  SGD: "sg", // Singapore dollar
  SHP: "sh", // Saint Helena pound
  SLL: "sl", // Sierra Leone leone
  SOS: "so", // Somalia shilling
  SRD: "sr", // Suriname dollar
  SSP: "ss", // South Sudan pound
  STN: "st", // Sao Tome and Principe dobra
  SYP: "sy", // Syria pound
  SZL: "sz", // Eswatini lilangeni
  THB: "th", // Thailand baht
  TJS: "tj", // Tajikistan somoni
  TMT: "tm", // Turkmenistan manat
  TND: "tn", // Tunisia dinar
  TOP: "to", // Tonga paʻanga
  TRY: "tr", // Turkey lira
  TTD: "tt", // Trinidad and Tobago dollar
  TWD: "tw", // Taiwan dollar
  TZS: "tz", // Tanzania shilling
  UAH: "ua", // Ukraine hryvnia
  UGX: "ug", // Uganda shilling
  USD: "us", // United States dollar
  UYU: "uy", // Uruguay peso
  UZS: "uz", // Uzbekistan som
  VES: "ve", // Venezuela bolivar
  VND: "vn", // Vietnam dong
  VUV: "vu", // Vanuatu vatu
  WST: "ws", // Samoa tala
  XAF: "cm", // Central African CFA franc (Cameroon flag)
  XCD: "ag", // East Caribbean dollar (Antigua and Barbuda flag)
  XDR: "un", // IMF special drawing rights (no flag)
  XOF: "sn", // West African CFA franc (Senegal flag)
  XPF: "pf", // CFP franc (French Polynesia flag)
  YER: "ye", // Yemen rial
  ZAR: "za", // South Africa rand
  ZMW: "zm", // Zambia kwacha
  ZWL: "zw", // Zimbabwe dollar
  BTC: "un", // Bitcoin (no country)
  ETH: "un", // Ethereum (no country)
  LTC: "un", // Litecoin (no country)
};



const symbolMap = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "CA$",
  AUD: "A$",
  CNY: "¥",
  INR: "₹",
  RWF: "FRw",
  KES: "KSh",
  ZAR: "R",
  NGN: "₦",
  GHS: "GH₵",
  TZS: "TSh",
  UGX: "USh",
  EGP: "£",
  MAD: "MAD",
  CHF: "CHF",
  SEK: "kr",
  NOK: "kr",
  DKK: "kr",
  NZD: "NZ$",
  SGD: "S$",
  HKD: "HK$",
  MYR: "RM",
  THB: "฿",
  IDR: "Rp",
  PHP: "₱",
  KRW: "₩",
  BRL: "R$",
  MXN: "$",
  RUB: "₽",
  TRY: "₺",
  SAR: "﷼",
  AED: "د.إ",
  ILS: "₪",
  PLN: "zł",
  CZK: "Kč",
  HUF: "Ft",
  CLP: "$",
  COP: "$",
  ARS: "$",
  VND: "₫",
  BTC: "₿",
  XAU: "Au",
  XAG: "Ag",
  XPT: "Pt",
  XPD: "Pd",
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

    // Set default values both visually and in hidden inputs
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
  dropdown.innerHTML = ""; // Clear previous content

  const selected = document.createElement("div");
  selected.className = "selected-option";
  selected.innerHTML = "Select Currency";

  const optionsList = document.createElement("div");
  optionsList.className = "options-list";

  currencies.forEach((currency) => {
    const code = currency[0];
    const name = currency[1];
    const country = flagMap[code] || "un";

    const option = document.createElement("div");
    option.innerHTML = `<img src="https://flagcdn.com/24x18/${country}.png"> ${code} - ${name}`;

    option.addEventListener("click", () => {
      selected.innerHTML = `<img src="https://flagcdn.com/24x18/${country}.png"> ${code}`;
      optionsList.style.display = "none";
      targetInput.value = code;
      // If amount is entered, do a conversion update for better UX
      if (amountInput.value > 0) convertCurrency();
      // Also update daily rate
      showDailyRate(code, dropdownId === "fromDropdown" ? toCurrency.value : fromCurrency.value);
    });

    optionsList.appendChild(option);
  });

  selected.addEventListener("click", () => {
    optionsList.style.display = optionsList.style.display === "flex" ? "none" : "flex";
  });

  dropdown.appendChild(selected);
  dropdown.appendChild(optionsList);
}

function updateSelected(dropdownId, code) {
  const dropdown = document.getElementById(dropdownId);
  const selected = dropdown.querySelector(".selected-option");
  const country = flagMap[code] || "un";
  selected.innerHTML = `<img src="https://flagcdn.com/24x18/${country}.png"> ${code}`;
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

convertBtn.addEventListener("click", () => {
  convertCurrency();
  showDailyRate(fromCurrency.value, toCurrency.value);
});

function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || amount <= 0) {
    resultDiv.textContent = "Please enter a valid amount.";
    dailyRateDiv.textContent = "";
    return;
  }

  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.result === "success") {
        const fromSymbol = symbolMap[from] || "";
        const toSymbol = symbolMap[to] || "";
        resultDiv.textContent = `${fromSymbol}${amount.toFixed(2)} ${from} = ${toSymbol}${data.conversion_result.toFixed(2)} ${to}`;
      } else {
        resultDiv.textContent = "Conversion failed: " + (data["error-type"] || "Unknown error");
      }
    })
    .catch((err) => {
      resultDiv.textContent = "Error fetching conversion rate.";
      console.error(err);
    });
}

// Show daily exchange rate and difference compared to yesterday
function showDailyRate(from, to) {
  dailyRateDiv.textContent = "Loading daily rates...";
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const todayStr = today.toISOString().slice(0, 10);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  const urlToday = `https://v6.exchangerate-api.com/v6/${apiKey}/history/${from}/${to}/${todayStr}`;
  const urlYesterday = `https://v6.exchangerate-api.com/v6/${apiKey}/history/${from}/${to}/${yesterdayStr}`;

  // Because ExchangeRate-API may not support history in free tier, 
  // fallback to current rate if needed

  // For demo, fetch current rate only:
  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`)
    .then(res => res.json())
    .then(data => {
      if (data.result !== "success") {
        dailyRateDiv.textContent = "";
        return;
      }
      // We don’t have yesterday’s data in free tier, so just show current rate:
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
  } else {
    offlineMsg.style.display = "block";
    convertBtn.disabled = true;
  }
}

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);
window.onload = () => {
  updateOnlineStatus();
  showDailyRate(fromCurrency.value, toCurrency.value);
};
