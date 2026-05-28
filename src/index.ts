import  express  from "express";
import Router  from "./routes/route.ts";
const app = express();
const port = "3000";

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Response sent");
});

app.use("/api",Router)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
