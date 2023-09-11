import "./App.css";
import SearchForm from "./components/SearchForm";
// import Results from "./components/Results";
import MorningFlights from "./components/MorningFlights";
import SwedishFlights from "./components/SwedishFlights";
import MostPopular from "./components/MostPopular";
import React from "react";

const ENDPOINT = "http://localhost:3000/api/flights";
// This url is incorrect, wrong port. Must be the same port. May need middleware in express app to satisfy CORS requirements.

function App() {
  const [data, setData] = React.useState({});

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

  const flightsArray = data.flight;
  // if (data.flight) {
  //   flightsArray.map((flight) => {
  //     console.log(flight);
  //   });
  // }

  return (
    <>
      <MostPopular data={data} />
      <SwedishFlights data={data}/>
      <MorningFlights data={data} />
    </>
  );
}

export default App;
