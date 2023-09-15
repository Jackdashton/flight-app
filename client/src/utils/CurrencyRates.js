function CurrencyRates(currencies) {
  let currencyTypes = Object.keys(currencies);
  const currencyRates = {};

  // Define currency conversion rates as of Jan 2018
  currencyRates[currencyTypes[0]] = 1.0; // GBP - original
  currencyRates[currencyTypes[1]] = 0.5769; // AUD
  currencyRates[currencyTypes[2]] = 0.0398; // ARS
  currencyRates[currencyTypes[3]] = 0.2015; // AED
  currencyRates[currencyTypes[4]] = 0.0597; // ZAR
  currencyRates[currencyTypes[5]] = 0.8889; // EUR

  return CurrencyRates;
}

export default CurrencyRates;
