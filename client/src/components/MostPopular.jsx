import React from "react";
import PropTypes from "prop-types";
import styles from "./MostPopular.module.css"

function MostPopular({ data }) {
  const flightsArray = data.flight;
  const [topAirports, setTopAirports] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (flightsArray) {
      // Create object for airport occurences
      const destOccurences = {};

      flightsArray.forEach((flight) => {
        // For flights with segments array and containing at least one element
        if (flight.segments) {
          flight.segments[0].segment.forEach((segment) => {
            const destAirport = segment.$.arrcode;
            // destAirport key - if key exists + 1 , or new key + 1
            destOccurences[destAirport] = (destOccurences[destAirport] || 0) + 1;
            // console.log(destOccurences);
            // console.log("done");
          });
        } else if (!flight.$.segments){
          // If no segments, count destair occurences
          const destAirport = flight.$.destair;
          destOccurences[destAirport] = (destOccurences[destAirport] || 0) + 1;
          // console.log(destOccurences);
          // console.log("no segments")
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

  return (
    <div className={styles.container}>
      {isLoading ? (
        <p>Data Loading.....</p>
      ) : (
        <ol>
          {topAirports.map((airport, index) => (
            <li key={index}> <strong>{airport}</strong></li>
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
