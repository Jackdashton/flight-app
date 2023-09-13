import React from "react";
import { swedishIATACodes } from "../swedishAirports.data.js";
import PropTypes from "prop-types";
import styles from "./SwedishFlights.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";

function SwedishFlights({ data }) {
  const swedishCodes = swedishIATACodes;
  const flightsArray = data.flight;
  const [count, setCount] = React.useState(0);
  const [totalFlights, setTotalFlights] = React.useState(0);
  const [swedishFlights, setSwedishFlights] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    function getSwedishFlights(flightsArray) {
      let flightCount = 0;
      const swedishFlightsData = [];
      let totalFlights = 0;

      flightsArray.forEach((flight) => {
        const hasSegments = flight.segments && flight.segments[0].segment;

        if (!hasSegments) {
          totalFlights++;
        } else if (hasSegments) {
          const segments = flight.segments[0].segment;

          segments.map((segment) => {
            totalFlights++;
          });
        }

        if (swedishCodes.includes(flight.$.destair)) {
          flightCount++;
          swedishFlightsData.push(flight);
        }
        if (flight.segment) {
          flight.segment.forEach((segment) => {
            if (swedishCodes.includes(segment.$.arrcode)) {
              flightCount++;
              swedishFlightsData.push(segment);
            }
          });
        }
      });
      setCount(flightCount);
      setTotalFlights(totalFlights);
      setSwedishFlights(swedishFlightsData);
      setIsLoading(false);
    }

    if (flightsArray) {
      getSwedishFlights(flightsArray);
    }
  }, [flightsArray]);

  const percentageOfFlights = Math.round((count / totalFlights) * 10000) / 100;

  return (
    <div className={styles.container}>
      <div className={styles.answers}>
        <p>
          Total Flights (including segment flights):{" "}
          <strong>{totalFlights}</strong>
        </p>
        <p>
          What percentage of total flights fly into Sweden:{" "}
          <strong>{percentageOfFlights}%</strong>
        </p>
        <p>
          Number of flights flying into Sweden: <strong>{count}</strong>
        </p>
      </div>

      {isLoading ? (
        <p>Flight Data Loading....</p>
      ) : (
        <ul>
          {swedishFlights.map((flight, index) => (
            <li key={index} className={styles.card}>
              <div className={styles.column}>
                <div className={styles.destination}>
                  <div className={styles.out}>
                    <div className={styles.outDep}>
                      <p>{flight.$.depair}</p>
                    </div>
                    <p>
                      -- <FontAwesomeIcon icon={faPlane} /> --
                    </p>
                    <div className={styles.outArr}>
                      <p>{flight.$.destair}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

SwedishFlights.propTypes = {
  data: PropTypes.object,
};

export default SwedishFlights;
