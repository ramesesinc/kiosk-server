const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");

const config = require("./config/config.js");
const port = global.gConfig.node_port;

const app = express();
const http = require("http").createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* setup client */
const clientBuildPath = path.join("client", "build");
app.use(express.static(path.join(__dirname, clientBuildPath)));
app.use(express.static("public"));


/* kiosk client FALLBACK Handler */
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, clientBuildPath, "index.html"));
});

http.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on port ${port}`);
  }
});
