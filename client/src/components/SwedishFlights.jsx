import React from "react";
import { swedishIATACodes } from "../swedishAirports.data.js";
import PropTypes from "prop-types";

function SwedishFlights({ data }) {
  const swedishCodes = swedishIATACodes;
  const flightsArray = data.flight;
  const [count, setCount] = React.useState(0);
  const [swedishFlights, setSwedishFlights] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    function getSwedishFlights(flightsArray) {
      let flightCount = 0;
      const swedishFlightsData = [];
      flightsArray.forEach((flight) => {
        if (swedishCodes.includes(flight.$.destair)) {
          flightCount++;
          swedishFlightsData.push(flight);
        }
        if (flight.segment) {
          flight.segment.forEach((segment) => {
            if (swedishCodes.includes(segment.$.arrcode)) {
              flightCount++;
              swedishFlightsData.push(segment);
            }
          });
        }
      });
      setCount(flightCount);
      setSwedishFlights(swedishFlightsData);
      setIsLoading(false);
    }

    if (flightsArray) {
      getSwedishFlights(flightsArray);
    }
  }, [flightsArray]);

  return (
    <>
      <h4>Swedish Flights</h4>
      <p>Number of flights flying in to Sweden: {count} </p>
      {isLoading ? (
        <p>Flight Data Loading....</p>
      ) : (
        <ul>
          {swedishFlights.map((flight, index) => (
            <li key={index}>{flight.$.destair}</li>
          ))}
        </ul>
      )}
    </>
  );
}

SwedishFlights.propTypes = {
  data: PropTypes.object,
};

export default SwedishFlights;
