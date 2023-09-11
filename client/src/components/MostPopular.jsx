import React from "react";
import PropTypes from "prop-types";

function MostPopular({ data }) {
  const flightsArray = data.flight;
  const [topAirports, setTopAirports] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (flightsArray) {
      // Create object for airport occurences
      const destOccurences = {};

      flightsArray.forEach((flight) => {
        // For flights without segments, use destair
        if (!flight.segment) {
          const destAirport = flight.$.destair;
          // destAirport key - if key exists + 1 , or new key + 1
          destOccurences[destAirport] = (destOccurences[destAirport] || 0) + 1;
        } else {
          flight.segment.forEach((segment) => {
            const destAirport = segment.$.arrcode;
            destOccurences[destAirport] =
              (destOccurences[destAirport] || 0) + 1;
          });
        }
      });

      // Sort Airports
      const sortedAirports = Object.keys(destOccurences).sort(
        (a, b) => destOccurences[b] - destOccurences[a]
      );

      // Top 10
      const topTen = sortedAirports.slice(0, 10);
      setTopAirports(topTen);
      setIsLoading(false);
    }
  }, [flightsArray]);

  console.log(topAirports);

  return (
    <>
      <h4>Most Popular</h4>
      {isLoading ? (
        <p>Data Loading.....</p>
      ) : (
        <ul>
          {topAirports.map((airport, index) => (
            <li key={index}>{airport}</li>
          ))}
        </ul>
      )}
    </>
  );
}

MostPopular.propTypes = {
  data: PropTypes.object,
};

export default MostPopular;
