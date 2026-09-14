const API_KEY = 'YOUR_EXCHANGERATE_API_KEY';
const API_ROOT = `https://v6.exchangerate-api.com/v6/${API_KEY}`;
const PUBLIC_API_ROOT = 'https://api.frankfurter.app';
const BACKUP_API_ROOT = 'https://open.er-api.com/v6/latest';
const usesPublicApi = API_KEY === 'YOUR_EXCHANGERATE_API_KEY';
const FALLBACK_CURRENCIES = ['AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'INR', 'ISK', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR'];

const fromCurrency = document.querySelector('#from-currency');
const toCurrency = document.querySelector('#to-currency');
const amountInput = document.querySelector('#amount');
const resultElement = document.querySelector('#result');
const rateElement = document.querySelector('#rate');
const convertButton = document.querySelector('#convert-button');
const switchButton = document.querySelector('#switch-button');

function showMessage(message, isError = false) {
	resultElement.textContent = message;
	resultElement.classList.toggle('error', isError);
}

function addCurrencyOptions(codes) {
	const options = codes.map((code) => `<option value="${code}">${code}</option>`).join('');
	fromCurrency.innerHTML = options;
	toCurrency.innerHTML = options;
	fromCurrency.value = 'USD';
	toCurrency.value = 'EUR';
}

async function loadCurrencies() {
	try {
		const response = await fetch(usesPublicApi ? `${PUBLIC_API_ROOT}/currencies` : `${API_ROOT}/codes`);
		if (!response.ok) throw new Error('Supported currencies could not be loaded');
		const data = await response.json();
		if (usesPublicApi) {
			addCurrencyOptions(Object.keys(data));
		} else {
			if (data.result !== 'success') throw new Error(data['error-type'] || 'Currency request failed');
			addCurrencyOptions(data.supported_codes.map(([code]) => code));
		}
		showMessage('Enter an amount and choose Convert.');
	} catch (error) {
		console.error(error);
		addCurrencyOptions(FALLBACK_CURRENCIES);
		showMessage('Live currency list unavailable. Common currencies are ready to use.', true);
	}
}

async function convertCurrency() {
	const amount = Number(amountInput.value);
	if (!Number.isFinite(amount) || amount < 0) {
		showMessage('Please enter a valid amount.', true);
		return;
	}

	convertButton.disabled = true;
	showMessage('Fetching the latest exchange rate...');

	try {
		const from = fromCurrency.value;
		const to = toCurrency.value;
		if (from === to) {
			resultElement.textContent = `${amount.toLocaleString()} ${to}`;
			rateElement.textContent = `1 ${from} = 1 ${to}`;
			resultElement.classList.remove('error');
			return;
		}

		const response = await fetch(usesPublicApi
			? `${PUBLIC_API_ROOT}/latest?amount=${amount}&from=${from}&to=${to}`
			: `${API_ROOT}/pair/${from}/${to}/${amount}`);
		if (!response.ok) throw new Error('Primary conversion request failed');
		const data = await response.json();
		if (usesPublicApi) {
			if (data.rates && typeof data.rates[to] === 'number') {
				resultElement.textContent = `${data.rates[to].toLocaleString(undefined, { maximumFractionDigits: 2 })} ${to}`;
				rateElement.textContent = `Live rate from ${from} to ${to}`;
				resultElement.classList.remove('error');
				return;
			}
			throw new Error('Primary conversion data was incomplete');
		}
		if (data.result !== 'success') throw new Error(data['error-type'] || 'Conversion failed');

		resultElement.textContent = `${data.conversion_result.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${to}`;
		resultElement.classList.remove('error');
		rateElement.textContent = `1 ${from} = ${data.conversion_rate.toLocaleString(undefined, { maximumFractionDigits: 6 })} ${to}`;
	} catch (error) {
		console.error(error);
		try {
			const backupResponse = await fetch(`${BACKUP_API_ROOT}/${fromCurrency.value}`);
			if (!backupResponse.ok) throw new Error('Backup conversion request failed');
			const backupData = await backupResponse.json();
			const backupRate = backupData.rates?.[toCurrency.value];
			if (backupData.result !== 'success' || typeof backupRate !== 'number') throw new Error('Backup conversion data was incomplete');
			const convertedAmount = Number(amountInput.value) * backupRate;
			resultElement.textContent = `${convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${toCurrency.value}`;
			resultElement.classList.remove('error');
			rateElement.textContent = `Live rate from ${fromCurrency.value} to ${toCurrency.value}`;
		} catch (backupError) {
			console.error(backupError);
			showMessage('Unable to convert these currencies. Please try again.', true);
			rateElement.textContent = '';
		}
	} finally {
		convertButton.disabled = false;
	}
}

function switchCurrencies() {
	const previousFrom = fromCurrency.value;
	fromCurrency.value = toCurrency.value;
	toCurrency.value = previousFrom;
	if (amountInput.value) convertCurrency();
}

convertButton.addEventListener('click', convertCurrency);
switchButton.addEventListener('click', switchCurrencies);
loadCurrencies();
