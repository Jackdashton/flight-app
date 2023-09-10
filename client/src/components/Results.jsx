import React from "react";
import PropTypes from "prop-types";

function Results({ data }) {
  const flightsArray = data.flight;

  function convertToTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(":");
    const date = new Date();
    date.setHours(hours, minutes, seconds, 0); //Date to 0 to get time only
    return date;
  }

  function morningInFlights() {
    // Set cut off time for check
    const noon = new Date();
    noon.setHours(12, 0, 0);

    if (flightsArray) {
      return (
        <ul>
          {flightsArray.map((flight) => {
            const inDepartTime = convertToTime(flight.$.indeparttime);

            if (inDepartTime < noon) {
              return (
                <li key={flight.$.id}>
                  <p>count {flight.$.inflightno}</p>
                  <p>Inbound Departure Time: {flight.$.indeparttime}</p>
                </li>
              );
            } else return null;
          })}
        </ul>
      );
    }
  }

  function morningOutFlights() {
    // Set cut off time for check
    const noon = new Date();
    noon.setHours(12, 0, 0);

    if (flightsArray) {
      return (
        <ul>
          {flightsArray.map((flight) => {
            const outDepartTime = convertToTime(flight.$.outdeparttime);

            if (outDepartTime < noon) {
              return (
                <li key={flight.$.id}>
                  <p>count {flight.$.outflightno}</p>
                  <p>Outbound Departure Time: {flight.$.outdeparttime}</p>
                </li>
              );
            } else return null;
          })}
        </ul>
      );
    }
  }

  return <>
  {morningInFlights()}
  {morningOutFlights()}
  Total Number of Flights:
  </>;

  // if (flightsArray) {
  //   return (
  //     <ul>
  //       {flightsArray.map((flight) => (
  //         <li key={flight.$.id}>
  //           <p>Carrier: {flight.$.carrier}</p>
  //           <p>Departure Airport: {flight.$.depair}</p>
  //           <p>Destination Airport: {flight.$.destair}</p>
  //           <p>
  //             Inbound Departure Time/Date: {flight.$.indepartdate}
  //             <br />
  //             {flight.$.indeparttime}
  //           </p>
  //           <p>
  //             Inbound Arrival Time/Date: {flight.$.inarrivaldate}
  //             <br />
  //             {flight.$.inarrivaltime}
  //           </p>
  //           <p>Inbound Arrival Code: {flight.$.inarrivecode}</p>
  //           <p>Inbound Booking Class: {flight.$.inbookingclass}</p>
  //           <p>Inbound Carrier Code: {flight.$.incarriercode}</p>
  //           <p>Inbound Departure Code: {flight.$.indepartcode}</p>
  //           <p>Inbound Flight Class: {flight.$.inflightclass}</p>
  //           <p>Inbound Flight Number: {flight.$.inflightno}</p>
  //           <p>
  //             Price: {flight.$.originalprice} {flight.$.originalcurrency}
  //           </p>
  //           <p>
  //             Outbound Departure Time/Date: {flight.$.outdepartdate}
  //             <br />
  //             {flight.$.outdeparttime}
  //           </p>
  //           <p>
  //             Outbound Arrival Time/Date: {flight.$.outarrivaldate}
  //             <br />
  //             {flight.$.outarrivaltime}
  //           </p>
  //           <p>Outbound Flight Class: {flight.$.outflightclass}</p>
  //           <p>Outbound Flight Number: {flight.$.outflightno}</p>
  //           <p>Outbound Booking Class: {flight.$.outbookingclass}</p>
  //           <p>Outbound Carrier Code: {flight.$.outcarriercode}</p>
  //           <p>Reservation: {flight.$.reservation}</p>
  //           <p>One way: {flight.$.oneway === "1" ? "Yes" : "No"}</p>
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // }
  // return <p> Cannot find Data</p>;
}

Results.propTypes = {
  data: PropTypes.object,
};

export default Results;
