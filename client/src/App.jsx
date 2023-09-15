import "./App.css";
import styles from "./App.module.css";
import MorningFlights from "./components/MorningFlights";
import SwedishFlights from "./components/SwedishFlights";
import LondonDubai from "./components/LondonDubai";
import CheapestFlights from "./components/CheapestFlights";
import MostPopular from "./components/MostPopular";
import React from "react";

// Vite convention
const ENDPOINT = import.meta.env.VITE_REACT_APP_API_URL;

function App() {
  const [data, setData] = React.useState({});
  const [showCheapestFlights, setShowCheapestFlights] = React.useState(false);
  const [showLondonDubai, setShowLondonDubai] = React.useState(false);
  const [showMostPopular, setShowMostPopular] = React.useState(false);
  const [showSwedishFlights, setShowSwedishFlights] = React.useState(false);
  const [showMorningFlights, setShowMorningFlights] = React.useState(false);

  // useEffect hook to allow fetch on mount, empty dependencies as no risk of stale data.
  React.useEffect(() => {
    // Flights data is fetched with an async/await function to allow all data to be gathered before continuing
    async function fetchData() {
      try {
        const response = await fetch(ENDPOINT);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>TravelTek Coding Test [FS-A2] </h1>
      <h3>Jack Ashton</h3>
      <div className={styles.menu}>
        <button onClick={() => setShowMorningFlights(!showMorningFlights)}>
          How many of the flights depart in the morning (before 12 PM)?
        </button>
        {showMorningFlights && <MorningFlights data={data} />}

        <button onClick={() => setShowSwedishFlights(!showSwedishFlights)}>
          What percentage of the total set of flights fly into Sweden?
        </button>
        {showSwedishFlights && <SwedishFlights data={data} />}

        <button onClick={() => setShowMostPopular(!showMostPopular)}>
          What are the 10 most popular destination airports?
        </button>
        {showMostPopular && <MostPopular data={data} />}

        <button onClick={() => setShowLondonDubai(!showLondonDubai)}>
          What’s the average journey time between London Heathrow (LHR) and
          Dubai (DXB)?
        </button>
        {showLondonDubai && <LondonDubai data={data} />}

        <button onClick={() => setShowCheapestFlights(!showCheapestFlights)}>
          Interesting Statistic: What are the 10 Cheapest Flights (converted to
          £)?
        </button>
        {showCheapestFlights && <CheapestFlights data={data} />}
      </div>
    </div>
  );
}

export default App;
