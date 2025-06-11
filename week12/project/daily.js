// Replace with your own key from https://www.exchangerate-api.com/
const API_KEY = 'YOUR-KEY-HERE';
const CODES_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/codes`;
const PAIR_URL  = (from, to, amount) =>
  `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`;

const fromSelect = document.getElementById('from');
const toSelect   = document.getElementById('to');
const amountInput= document.getElementById('amount');
const convertBtn = document.getElementById('convert');
const switchBtn  = document.getElementById('switch');
const resultDiv  = document.getElementById('result');

// 1) Populate currency selects
fetch(CODES_URL)
  .then(r => {
    if (!r.ok) throw new Error('Failed to fetch currency codes');
    return r.json();
  })
  .then(json => {
    if (json.result !== 'success') throw new Error(json['error-type']);
    json.supported_codes.forEach(([code, name]) => {
      const opt = new Option(`${code} – ${name}`, code);
      fromSelect.add(opt.cloneNode(true));
      toSelect.add(opt);
    });
    // default to USD → ILS if available
    fromSelect.value = 'USD';
    toSelect.value   = 'ILS';
  })
  .catch(err => {
    resultDiv.textContent = `Error loading currencies: ${err}`;
  });

// 2) Perform a conversion
function convert() {
  const from = fromSelect.value;
  const to   = toSelect.value;
  const amt  = parseFloat(amountInput.value) || 0;
  resultDiv.textContent = 'Converting…';
  fetch(PAIR_URL(from, to, amt))
    .then(r => {
      if (!r.ok) throw new Error('Conversion request failed');
      return r.json();
    })
    .then(json => {
      if (json.result !== 'success') throw new Error(json['error-type']);
      resultDiv.textContent = `${json.conversion_result} ${to}`;
    })
    .catch(err => {
      resultDiv.textContent = `Error: ${err}`;
    });
}

// 3) Switch from/to
switchBtn.addEventListener('click', () => {
  [fromSelect.value, toSelect.value] =
    [toSelect.value, fromSelect.value];
  convert();
});

convertBtn.addEventListener('click', convert);
