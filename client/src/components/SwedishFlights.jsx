import React from "react";
import { swedishIATACodes } from "../swedishAirports.data.js";

function SwedishFlights() {
  const swedishCodes = swedishIATACodes;

  return (
    <>
      <h1>Swedish Flights</h1>
      {swedishCodes}
    </>
  );
}

export default SwedishFlights;
