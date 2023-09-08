import React from "react";
import PropTypes from "prop-types";

function Results({ data }) {
  const flightsArray = data.flight;
  if (flightsArray) {
    return (
      <ul>
        {flightsArray.map((flight) => (
          <li key={flight.$.id}>{flight.$.id}</li>
        ))}
      </ul>
    );
  }
  return (
    <p> Can't find the Data</p>
  )
}

Results.propTypes = {
  data: PropTypes.object,
};

export default Results;
