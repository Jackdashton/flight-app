import React from "react";
import PropTypes from "prop-types";

function Results({ data }) {
  const flightsArray = data.flight;
  if (flightsArray) {
    return (
      <ul>
        {flightsArray.map((flight) => (
          <li key={flight.$.id}>
            <p>ID: {flight.$.id}</p>
            <p>Carrier: {flight.$.carrier}</p>
            <p>Departure Airport: {flight.$.depair}</p>
            <p>Destination Airport: {flight.$.destair}</p>
          </li>
        ))}
      </ul>
    );
  }
  return <p> Cannot find Data</p>;
}

Results.propTypes = {
  data: PropTypes.object,
};

export default Results;
