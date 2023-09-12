import React from "react";
import PropTypes from "prop-types";

function CheapestFlights({ data }) {
  const flightsArray = data.flight;
  const [currencies, setCurrencies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

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

  function currencyConversion() {
    let currencyTypes = Object.keys(currencies);
    const currencyRates = {};
    // Define currency conversion rates as of Jan 2018

    currencyRates[currencyTypes[0]] = 1.000; // GBP - original
    currencyRates[currencyTypes[1]] = 0.5769; // AUD
    currencyRates[currencyTypes[2]] = 0.0398; // ARS
    currencyRates[currencyTypes[3]] = 0.2015; // AED
    currencyRates[currencyTypes[4]] = 0.0597; // ZAR
    currencyRates[currencyTypes[5]] = 0.8889 ; // EUR
  }


  return (
    <div>
      <h4>10 Cheapest Flights</h4>
    </div>
  );
}

CheapestFlights.propTypes = {
  data: PropTypes.object,
};

export default CheapestFlights;
