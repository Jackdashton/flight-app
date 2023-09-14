import React from "react";
import PropTypes from "prop-types";

function LondonDubai({ data }) {
  const flightsArray = data.flight;
  const [isLoading, setIsLoading] = React.useState(true);
  const [flights, setFlights] = React.useState([]);
  const [outboundDurations, setOutboundDurations] = React.useState([]);
  const [inboundDurations, setInboundDurations] = React.useState([]);

  // Convert arrival and departure dates and times from string to time/date
  function convertToDateTime(dateString, timeString) {
    const [year, month, day] = dateString.split("-").map(Number);
    const [hours, minutes, seconds] = timeString.split(":");
    const date = new Date(year, month - 1, day, hours, minutes, seconds);
    return date;
  }

  // UseEffect hook to run on mount.
  React.useEffect(() => {
    const dubaiFlights = [];

    if (flightsArray) {
      flightsArray.map((flight) => {
        // Gather all LHR to DXB flights in an array
        if (flight.$.destair === "DXB" && flight.$.depair === "LHR") {
          dubaiFlights.push(flight);
        }
      });
    }
    // Store in state for easy access to array throughout component.
    setFlights(dubaiFlights);
  }, [flightsArray]);

  React.useEffect(() => {
    function calculateOutboundDurations() {
      const dubaiFlights = flights;
      const outboundDurations = [];

      dubaiFlights.forEach((flight) => {
        const depDateTime = convertToDateTime(
          flight.$.outdepartdate,
          flight.$.outdeparttime
        );
        const arrDateTime = convertToDateTime(
          flight.$.outarrivaldate,
          flight.$.outarrivaltime
        );
        // -4 Hours to account for GMT-GST (Can be modified to support BST (-3))
        // Convert to hours from milliseconds and round to 2dp
        const duration =
          Math.round(100 * (arrDateTime - depDateTime) * 2.777777777e-7) / 100 -
          4;
        outboundDurations.push(duration);
      });
      setOutboundDurations(outboundDurations);
    }
    calculateOutboundDurations();
  }, [flights]);

  React.useEffect(() => {
    function calculateInboundDurations() {
      const dubaiFlights = flights;
      const inboundDurations = [];

      dubaiFlights.forEach((flight) => {
        const depDateTime = convertToDateTime(
          flight.$.indepartdate,
          flight.$.indeparttime
        );
        const arrDateTime = convertToDateTime(
          flight.$.inarrivaldate,
          flight.$.inarrivaltime
        );
        // +4 Hours to account for GMT-GST (Can be modified to support BST (+3))
        // For this exercise, as no. in = out , same answer
        const duration =
          Math.round(100 * (arrDateTime - depDateTime) * 2.777777777e-7) / 100 +
          4;
        inboundDurations.push(duration);
      });
      setInboundDurations(inboundDurations);
      setIsLoading(false);
    }
    calculateInboundDurations();
  }, [flights]);

  // Combine two arrays and find average
  const allDurations = [...outboundDurations, ...inboundDurations];
  let total = 0;
  allDurations.map((number) => {
    total = total + number;
  });
  const avgDurationInHours =
    Math.round((total / allDurations.length) * 100) / 100;
  const hours = Math.floor(avgDurationInHours);
  const mins = Math.round((avgDurationInHours - hours) * 60);

  return (
    <>
      {isLoading ? (
        "Data Loading..."
      ) : (
        <p>
          The average journey takes: {hours} Hours {mins} Minutes
        </p>
      )}
    </>
  );
}

LondonDubai.propTypes = {
  data: PropTypes.object,
};

export default LondonDubai;
