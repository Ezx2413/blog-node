const path = require("path");

const express = require("express");
const dotEnv = require("dotenv");
const morgan = require("morgan");

const connectDB = require("./config/db");
const indexRouter = require("./routes/index");

//* Load Config
dotEnv.config({ path: "./config/config.env" });

//* Database Connection
connectDB();

const app = express();

//* Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//* Tamplate Engine
app.set("view engine", "ejs");
app.set("views", "views");

//* Static Folder
app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.static(
    path.join(__dirname, process.env.BOOTSTRAP)
  )
);
app.use(express.static(path.join(__dirname, process.env.FONTAWESOME)));

//* Routes
app.use(indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(
  3000,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
