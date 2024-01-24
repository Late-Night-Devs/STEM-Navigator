// activate .env variables
require("dotenv").config();
// express server
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const routes = require("./src/routes");

// Allow requests from http://localhost:5000 (frontend)
app.use(
  cors({
    origin: "http://localhost:5000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../frontend/build")));

// path: http://backend_URL/${routes}
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
