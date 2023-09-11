import React from "react";
import PropTypes from "prop-types";

function LondonDubai({ data }) {


  // In January UK = GMT, GMT to GST is +/- 4 hours - must be factored in to arrival and departure times
  // Data only contains LHR-DXB, not DXB-LHR - all but one are direct, however must account for all journeys

  const flightsArray = data.flight;
  const [isLoading, setIsLoading] = React.useState(true);

// Convert arrival and departure dates and times from string to time/date
  function convertToTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(":");
    const date = new Date();
    date.setHours(hours, minutes, seconds, 0); //Date to 0 to get time only
    return date;
  }

  function convertToDate(dateString) {
    const [day, month, year] = dateString.split("-").map(Number);
    const fullYear = 2000 + year;
    const date = new Date(fullYear, month -1, day);
    // JS zero based indexing for months, so -1
    return date;
  }



  return (
    <>
      <h4>Average journey time between LHR and DXB</h4>
    </>
  );
}

LondonDubai.propTypes = {
  data: PropTypes.object,
};

export default LondonDubai;
