import express from "express";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import bodyParser from "body-parser";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use("", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(bodyParser.json());

app.use("", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://${process.env.HOST_NAME}:${PORT}`);
});
