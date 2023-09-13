import React from "react";
import { swedishIATACodes } from "../swedishAirports.data.js";
import PropTypes from "prop-types";

function SwedishFlights({ data }) {
  const swedishCodes = swedishIATACodes;
  const flightsArray = data.flight;
  const [count, setCount] = React.useState(0);
  const [totalFlights, setTotalFlights] = React.useState(0)
  const [swedishFlights, setSwedishFlights] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    function getSwedishFlights(flightsArray) {
      let flightCount = 0;
      const swedishFlightsData = [];
      let totalFlights = 0;

      flightsArray.forEach((flight) => {

        const hasSegments = flight.segments && flight.segments[0].segment;

        if (!hasSegments){
          totalFlights++;
        } else if (hasSegments) {
          const segments = flight.segments[0].segment;

          segments.map((segment) => {
            totalFlights++;
          })
        }

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
      setTotalFlights(totalFlights);
      setSwedishFlights(swedishFlightsData);
      setIsLoading(false);
    }

    if (flightsArray) {
      getSwedishFlights(flightsArray);
    }
  }, [flightsArray]);


  const percentageOfFlights = Math.round(count / totalFlights * 10000)/100;

  return (
    <>
      <h4>Swedish Flights</h4>
      <p>Total Flights including segment flights: {totalFlights}</p>
      <p>Percentage of total flights which fly into Sweden: {percentageOfFlights}%</p>
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
