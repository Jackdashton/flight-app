import React from "react";
import PropTypes from "prop-types";

function CheapestFlights({ data }) {
  const flightsArray = data.flight;
  const [currencies, setCurrencies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currencyRates, setCurrencyRates] = React.useState({});
  const [convertedFlightsArray, setConvertedFlightsArray] = React.useState([]);
  const [sortedArray, setSortedArray] = React.useState([]);

  React.useEffect(() => {
    function gatherCurrencies() {
      const currencies = {};

      if (flightsArray) {
        flightsArray.map((flight) => {
          const flightCurrency = flight.$.originalcurrency;
          currencies[flightCurrency] = (currencies[flightCurrency] || 0) + 1;
        });
      }
      setCurrencies(currencies);
    }
    gatherCurrencies();
  }, [flightsArray]);

  React.useEffect(() => {
    function currencyRates() {
      let currencyTypes = Object.keys(currencies);
      const currencyRates = {};

      // Define currency conversion rates as of Jan 2018
      currencyRates[currencyTypes[0]] = 1.0; // GBP - original
      currencyRates[currencyTypes[1]] = 0.5769; // AUD
      currencyRates[currencyTypes[2]] = 0.0398; // ARS
      currencyRates[currencyTypes[3]] = 0.2015; // AED
      currencyRates[currencyTypes[4]] = 0.0597; // ZAR
      currencyRates[currencyTypes[5]] = 0.8889; // EUR

      setCurrencyRates(currencyRates);
    }
    currencyRates();
  }, [currencies]);

  React.useEffect(() => {
    function convertToGBP() {
      if (currencyRates && flightsArray) {
        const updatedFlightsArray = flightsArray.map((flight) => {
          const originalCurrency = flight.$.originalcurrency;
          const originalPrice = parseFloat(flight.$.originalprice);

          if (originalCurrency === "GBP") {
            return {
              // copy all properties of original flight and add new property with value
              ...flight,
              priceInGBP: originalPrice.toFixed(2),
            };
            //  check whether currency exists in currencyRates array
          } else if (currencyRates[originalCurrency]) {
            // Obtain conversion rate for currency
            const conversionRate = currencyRates[originalCurrency];
            const priceInGBP = Math.round((originalPrice * conversionRate)*100)/100;
            return {
              ...flight,
              priceInGBP,
            };
          } else {
            return flight;
          }
        });
        setConvertedFlightsArray(updatedFlightsArray);
      }
    }
    convertToGBP();
  }, [flightsArray, currencies, currencyRates]);

  React.useEffect(() => {
    function sortArray() {
      const sortedArray = [...convertedFlightsArray];
      sortedArray.sort((a, b) => a.priceInGBP - b.priceInGBP);
      console.log(sortedArray)
      setSortedArray(sortedArray);
    }
    sortArray();
  }, [convertedFlightsArray]);


  console.log(sortedArray);
  const cheapestTen = sortedArray.slice(0, 10);
  console.log(cheapestTen);

  return (
    <>
      <h4>10 Cheapest Flights</h4>
      <ul>
        {cheapestTen.map((flight, index) => {
          return <li key={index}>£ {flight.priceInGBP}</li>;
        })}
      </ul>
    </>
  );
}

CheapestFlights.propTypes = {
  data: PropTypes.object,
};

export default CheapestFlights;
