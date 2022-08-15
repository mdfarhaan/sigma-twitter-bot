const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = 5005;
const Api = require("./src/api");

const corsOpts = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  exposedHeaders: ["Content-Type"],
};

app.use(bodyParser.json());
app.use(cors(corsOpts));
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", Api);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
