const express = require("express");
const xml2js = require("xml2js");
const fs = require("fs");
const app = express();
const cors = require("cors");

// App listening to Port for requests
app.listen(3000);

// Middleware - allow requests from different ports (React port:5173)
app.use(cors());

app.get("/api/flights", (req, res) => {
  fs.readFile("flighdata_A.xml", "utf-8", (err, data) => {
    // if error does occur, err contains error object, otherwise data contains files contents as a string
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    // Parse XML to JSON using the xml2js library
    const parser = new xml2js.Parser();
    // new instance of the parser class
    parser.parseString(data, (xmlErr, result) => {
      // parseString method - result contains parsed data if successful
      if (xmlErr) {
        console.error(xmlErr);
        res.status(500).json({ error: "Failed to parse XML" });
        return;
      }

      const flights = result.flights;
      // extracts the flights property from result object (the parsed XML data)
      res.json(flights);
    });
  });
});
