import "./App.css";
import SearchForm from "./components/SearchForm";
import Results from "./components/Results";
import React from "react";

const ENDPOINT = "http://localhost:3000/api/flights";
// This url is incorrect, wrong port. Must be the same port. May need middleware in express app to satisfy CORS requirements.

function App() {
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch(ENDPOINT);
      const json = await response.json();
      setData(json);
      console.log(data);
    }

    fetchData();
  }, []);

  // Data object contains an array of flight objects - CAN'T ACCESS DATA AS IT'S INITIALLY
  // const flightsArray = data.flight;
  // console.log(flightsArray);

  // flightsArray.map((flight) => {
  //   console.log(flight)
  // })

  return (
    <>
      <SearchForm />
      <Results />
    </>
  );
}

export default App;
