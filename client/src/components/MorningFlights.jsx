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

  function getMorningFlights() {
    // Set cut off time for check
    const noon = new Date();
    noon.setHours(12, 0, 0);

    // Set count to 0
    let morningFlightCount = 0;
    const morningFlights = [];

    if (flightsArray) {
      for (const flight of flightsArray) {
        const hasSegments = flight.segments && flight.segments[0].segment;
        const inDepartTime = convertToTime(flight.$.indeparttime);
        const outDepartTime = convertToTime(flight.$.outdeparttime);

        if (!hasSegments) {
          // if there are no segments
          if (inDepartTime < noon && outDepartTime < noon) {
            morningFlightCount += 2;
            morningFlights.push(flight);
          } else if (inDepartTime < noon || outDepartTime < noon) {
            morningFlightCount++;
            morningFlights.push(flight);
          } else if (hasSegments) {
            // The flight has segments - check them
            const segments = flight.segments[0].segment;

            let hasMorningSegment = false;

            for (const segment of segments) {
              const segmentDepartTime = convertToTime(segment.$.deptime);

              if (segmentDepartTime < noon) {
                hasMorningSegment = true;
                morningFlights.push(segment);
                break;
              }
            }

            if (hasMorningSegment) {
              morningFlightCount++;
            }

            if (
              hasMorningSegment &&
              inDepartTime < noon &&
              outDepartTime < noon
            ) {
              morningFlightCount += 2;
            }
          }
        }
      }
    }

    return { count: morningFlightCount, flights: morningFlights };
  }

  const { count: morningFlightCount, flights: morningFlights } =
    getMorningFlights();

  return (
    <>
      <h4>Morning Flights</h4>
      <p>Number of morning flights: {morningFlightCount}</p>
      <ul>
        {morningFlights.map((flight, index) => (
          <li key={index}>
            <p>{flight.$.reservation}</p>
            <p>
              {flight.$.depair} - {flight.$.destair}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

MorningFlights.propTypes = {
  data: PropTypes.object,
};

export default MorningFlights;
