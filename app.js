const { appConfig } = require("./configs/appConfig");
global.appConfig = appConfig;

const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./configs/connectToMongoDB");
const { serverConstant } = require("./constants/serverConstant");
const app = express();
const routes = require("./app/routes");

app.use(cors());

app.use(express.json());

app.use(routes);

process.on("SIGINT", () => {
  process.exit(0);
});
process.on("SIGTERM", () => {
  process.exit(0);
});
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception: ", error);
  process.exit(1);
});

app.listen(appConfig.port, () => {
  connectToMongoDB();
});
