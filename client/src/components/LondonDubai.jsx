import React from "react";
import PropTypes from "prop-types";

function LondonDubai({ data }) {


  // In January UK = GMT, GMT to GST is +/- 4 hours - must be factored in to arrival and departure times
  // Data only contains LHR-DXB, not DXB-LHR - all but one are direct, however must account for all journeys

  const flightsArray = data.flight;
  const [isLoading, setIsLoading] = React.useState(true);
  const [flights, setFlights] = React.useState([]);

// Convert arrival and departure dates and times from string to time/date
  function convertToDateTime(dateString, timeString) {
    const [year, month, day] = dateString.split("-").map(Number);
    const [hours, minutes, seconds] = timeString.split(":");
    const date = new Date(year, month-1, day, hours, minutes, seconds);
    return date;
  }

  React.useEffect(() => {
    const dubaiFlights = [];

    if (flightsArray) {
      flightsArray.map((flight) => {
        if (flight.$.destair === "DXB" && flight.$.depair === "LHR") {
          dubaiFlights.push(flight);
        }
      })
    }
    setFlights(dubaiFlights);
    console.log(dubaiFlights);
  },[flightsArray])

  function outboundFlights(){
    const dubaiFlights = flights;

    dubaiFlights.forEach((flight) => {
      const depDateString = flight.$.outdepartdate;
      const depTimeString = flight.$.outdeparttime;
      const arrDateString = flight.$.outarrivaldate;
      const arrTimeString = flight.$.outarrivaltime;
      const depDateTime = convertToDateTime(depDateString, depTimeString);
      const arrDateTime = convertToDateTime(arrDateString, arrTimeString);
      // -4 Hours to account for GMT-GST (Can be modified to support BST (-3))
      // Convert to hours from milliseconds and round to 2dp
      const duration = (Math.round(100*(arrDateTime - depDateTime)*2.777777777E-7)/100)-4;
      console.log(duration)
    })
  }

  outboundFlights();


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
