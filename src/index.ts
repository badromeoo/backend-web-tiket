import express from "express";
import Router from "./routes/route.ts";
import bodyParser from "body-parser";
import conectDB from "./utils/database.ts";
import env from "./utils/env.ts"
const app = express();
const port = "3000";

const jwtSecret = env.JWT_SECRET
const result = await conectDB();
console.log(result);
app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Response sent");
});

app.use(bodyParser.json());

app.use("/api", Router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port} `);
});
