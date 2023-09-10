import React from "react";
import PropTypes from "prop-types";

function MorningFlights({ data }) {
  const flightsArray = data.flight;

  // Convert the data from string to time/date
  function convertToTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(":");
    const date = new Date();
    date.setHours(hours, minutes, seconds, 0); //Date to 0 to get time only
    return date;
  }

  // Count Variable
  let morningFlightCount = 0;

  // Check for Segments
  function segmentCheck() {
    flightsArray.map((flight) => {
      if (flight.segment.length > 0) {segmentInFlights}
    })
  }


}

MorningFlights.propTypes = {
  data: PropTypes.object,
};

export default MorningFlights;
