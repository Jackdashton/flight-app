import React from "react";
import PropTypes from "prop-types";
import styles from "./MostPopular.module.css";

function MostPopular({ data }) {
  const flightsArray = data.flight;
  const [topAirports, setTopAirports] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // UseEffect hook to run on mount.
  React.useEffect(() => {
    if (flightsArray) {
      // Object to store all airports and occurences "ACE : 61"
      const destOccurences = {};

      flightsArray.forEach((flight) => {
        // If flights have segments run code for each segment
        if (flight.segments) {
          flight.segments[0].segment.forEach((segment) => {
            const destAirport = segment.$.arrcode;
            destOccurences[destAirport] =
              (destOccurences[destAirport] || 0) + 1;
          });
        } else if (!flight.$.segments) {
          // If no segments, run code for the flight
          const destAirport = flight.$.destair;
          destOccurences[destAirport] = (destOccurences[destAirport] || 0) + 1;
        }
      });

      // Create variable containing descending ordered list
      const sortedAirports = Object.keys(destOccurences).sort(
        (a, b) => destOccurences[b] - destOccurences[a]
      );

      // Array to hold airport names, occurences no longer required.
      const topTen = sortedAirports.slice(0, 10);
      setTopAirports(topTen);
      setIsLoading(false);
    }
  }, [flightsArray]);

  return (
    <div className={styles.airportContainer}>
      {/* Terenary which will only render the data if the function has run for better UX*/}
      {isLoading ? (
        <p>Data Loading...</p>
      ) : (
        <ol>
          {topAirports.map((airport, index) => (
            <li key={index} className={styles.airportCard}>
              <img src={`/flags/${airport}.png`} alt={{ airport }} />
              <p>{index+1}.<strong>{airport}</strong></p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

MostPopular.propTypes = {
  data: PropTypes.object,
};

export default MostPopular;
