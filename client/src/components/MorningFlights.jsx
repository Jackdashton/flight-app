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

  function countMorningFlights() {
    // Set cut off time for check
    const noon = new Date();
    noon.setHours(12, 0, 0);

    // Set count to 0
    let morningFlightCount = 0;

    if (flightsArray) {
      for (const flight of flightsArray) {
        const hasSegments = flight.segments && flight.segments[0].segment;
        const inDepartTime = convertToTime(flight.$.indeparttime);
        const outDepartTime = convertToTime(flight.$.outdeparttime);

        if (!hasSegments) {
          // if there are no segments
          if(inDepartTime < noon && outDepartTime < noon) {
            morningFlightCount += 2;
          } else if (inDepartTime < noon || outDepartTime < noon) {
            morningFlightCount++;
          } else if (hasSegments) {
            // The flight has segments - check them
            const segments = flight.segments[0].segment;

            let hasMorningSegment = false;

            for(const segment of segments) {
              const segmentDepartTime = convertToTime(segment.$.deptime);

              if (segmentDepartTime < noon) {
                hasMorningSegment = true;
                break;
              }
            }

            if (hasMorningSegment) {
              morningFlightCount++;
            }

            if (hasMorningSegment && inDepartTime < noon && outDepartTime < noon ) {
              morningFlightCount += 2;
            }
          }
        }
      }
    }

    return morningFlightCount;

  }

  const morningFlightCount = countMorningFlights();

  return (
    <>
      <p>Number of morning flights: {morningFlightCount}</p>
    </>
  )

}

MorningFlights.propTypes = {
  data: PropTypes.object,
};

export default MorningFlights;
