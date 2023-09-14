import React from "react";
import PropTypes from "prop-types";
import styles from "./CheapestFlight.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane} from "@fortawesome/free-solid-svg-icons";

function CheapestFlights({ data }) {
  const flightsArray = data.flight;
  const [currencies, setCurrencies] = React.useState([]);
  const [currencyRates, setCurrencyRates] = React.useState({});
  const [convertedFlightsArray, setConvertedFlightsArray] = React.useState([]);
  const [sortedArray, setSortedArray] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    function gatherCurrencies() {
      // Object to store all currency types and how many times they appear.
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
            const priceInGBP =
              Math.round(originalPrice * conversionRate * 100) / 100;
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
    setIsLoading(false);
    convertToGBP();
  }, [flightsArray, currencies, currencyRates]);

  React.useEffect(() => {
    function sortArray() {
      const sortedArray = [...convertedFlightsArray];
      sortedArray.sort((a, b) => a.priceInGBP - b.priceInGBP);
      setSortedArray(sortedArray);
    }
    sortArray();
  }, [convertedFlightsArray]);

  const cheapestTen = sortedArray.slice(0, 10);

  return (
    <div>
      {isLoading ? (
        "Data Loading..."
      ) : (
        <ul className={styles.flightContainer}>
          {cheapestTen.map((flight, index) => {
            return (
              <div key={index}>
                <li key={index} className={styles.card}>
                  <div className={styles.column}>
                    <div className={styles.airline}>
                      <p>{flight.$.carrier}</p>
                    </div>
                  </div>
                  <div className={styles.column}>
                    <div className={styles.destination}>
                      <div className={styles.out}>
                        <div className={styles.outDep}>
                          <p>{flight.$.depair}</p>
                        </div>
                        <p>-- <FontAwesomeIcon icon={faPlane} /> --</p>
                        <div className={styles.outArr}>
                          <p>{flight.$.destair}</p>
                        </div>
                      </div>
                      <div className={styles.in}>
                        <div className={styles.inArr}>
                          <p>{flight.$.destair}</p>
                        </div>
                        <p>-- <FontAwesomeIcon icon={faPlane} rotation={180} /> --</p>
                        <div className={styles.inDep}>
                          <p>{flight.$.depair}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.column}>
                    <div className={styles.price}>
                      <p>£ {flight.priceInGBP}</p>
                    </div>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
}

CheapestFlights.propTypes = {
  data: PropTypes.object,
};

export default CheapestFlights;
