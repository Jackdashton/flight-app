const express = require("express");
const xml2js = require("xml2js");
const fs = require("fs");
const app = express();
const cors = require("cors");

// App listening to Port for requests
app.listen(process.env.PORT || 3000 );

// Middleware - allow requests from different ports (React port:5173)
app.use(cors({origin: "https://flight-app.jackashton.dev"}));

app.get("/api/flights", (req, res) => {
  fs.readFile("flighdata_A.xml", "utf-8", (err, data) => {
    // if error does occur, err contains error object, otherwise data contains files contents as a string
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    const parser = new xml2js.Parser();
    parser.parseString(data, (xmlErr, result) => {
      if (xmlErr) {
        console.error(xmlErr);
        res.status(500).json({ error: "Failed to parse XML" });
        return;
      }

      const flights = result.flights;
      res.json(flights);
    });
  });
});
