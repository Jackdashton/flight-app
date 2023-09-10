import React from "react";
import { swedishIATACodes } from "../swedishAirports.data.js";
import PropTypes from 'prop-types';

function SwedishFlights({ data }) {
  const swedishCodes = swedishIATACodes;
  const flightsArray = data.flight;
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {

    function getSwedishFlights(flightsArray) {
      console.log(flightsArray);
      flightsArray.forEach((flight) => {
        if (swedishCodes.includes(flight.$.destair)) {
          setCount((prevCount) => prevCount + 1);
        }
      });
    }

    if (flightsArray) {
      getSwedishFlights(flightsArray);
    }
  }, []);

  return (
    <>
      <h1>Swedish Flights</h1>
      <p>Number of flights flying in to Sweden: {count} </p>
    </>
  );
}

SwedishFlights.propTypes = {
  data: PropTypes.object,
};


export default SwedishFlights;
