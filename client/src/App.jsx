import "./App.css";
import MorningFlights from "./components/MorningFlights";
import SwedishFlights from "./components/SwedishFlights";
import LondonDubai from "./components/LondonDubai";
import CheapestFlights from "./components/CheapestFlights";
import MostPopular from "./components/MostPopular";
import React from "react";

const ENDPOINT = "http://localhost:3000/api/flights";

function App() {
  const [data, setData] = React.useState({});
  const [showCheapestFlights, setShowCheapestFlights] = React.useState(false);
  const [showLondonDubai, setShowLondonDubai] = React.useState(false);
  const [showMostPopular, setShowMostPopular] = React.useState(false);
  const [showSwedishFlights, setShowSwedishFlights] = React.useState(false);
  const [showMorningFlights, setShowMorningFlights] = React.useState(false);

  React.useEffect(() => {
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

  console.log(showCheapestFlights);

  return (
    <>
      <button
      onClick={() => setShowCheapestFlights(!showCheapestFlights)}
      >Interest Statistic: What are the  10 Cheapest Flights</button>
      {showCheapestFlights && <CheapestFlights data={data} />}

      <button
      onClick={() => setShowLondonDubai(!showLondonDubai)}
      >What’s the average journey time between London Heathrow (LHR) and Dubai (DXB)?</button>
      {showLondonDubai && <LondonDubai data={data} /> }

      <button
      onClick={() => setShowMostPopular(!showMostPopular)}
      >What are the 10 most popular destination airports?</button>
      {showMostPopular && <MostPopular data={data} /> }

      <button
      onClick={() => setShowSwedishFlights(!showSwedishFlights)}
      >What percentage of the total set of flights fly into Sweden?</button>
      {showSwedishFlights && <SwedishFlights data={data} /> }

      <button
      onClick={() => setShowMorningFlights(!showMorningFlights)}
      >How many of the flights depart in the morning (before 12 PM)?</button>
      {showMorningFlights && <MorningFlights data={data} /> }
    </>
  );
}

export default App;
