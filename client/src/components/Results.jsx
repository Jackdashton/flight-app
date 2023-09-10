import React from "react";
import PropTypes from "prop-types";

function Results({ data }) {
  const flightsArray = data.flight;

  function convertToTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(":");
    const date = new Date();
    date.setHours(hours, minutes, seconds, 0); //Date to 0 to get time only
    return date;
  }

  function morningInFlights() {
    // Set cut off time for check
    const noon = new Date();
    noon.setHours(12, 0, 0);

    if (flightsArray) {
      return (
        <ul>
          {flightsArray.map((flight) => {
            const inDepartTime = convertToTime(flight.$.indeparttime);

            if (inDepartTime < noon && flight.$.indepartcode !== "") {
              return (
                <li key={flight.$.id}>
                  <p>count {flight.$.inflightno}</p>
                  <p>Inbound Departure Time: {flight.$.indeparttime}</p>
                </li>
              );
            } else return null;
          })}
        </ul>
      );
    }
  }

  function morningOutFlights() {
    // Set cut off time for check
    const noon = new Date();
    noon.setHours(12, 0, 0);

    if (flightsArray) {
      return (
        <ul>
          {flightsArray.map((flight) => {
            const outDepartTime = convertToTime(flight.$.outdeparttime);

            if (outDepartTime < noon) {
              return (
                <li key={flight.$.id}>
                  <p>count {flight.$.outflightno}</p>
                  <p>Outbound Departure Time: {flight.$.outdeparttime}</p>
                </li>
              );
            } else return null;
          })}
        </ul>
      );
    }
  }

  return (
    <>
      {morningInFlights()}
      {morningOutFlights()}
      Total Number of Flights:
    </>
  );
}

Results.propTypes = {
  data: PropTypes.object,
};

export default Results;
