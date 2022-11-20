import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_, res) => res.send("running"));

let PORT = 4000;
app.listen(PORT, async () => {
  console.log(`server running at http://localhost:${PORT}`);

  AppDataSource.initialize()
    .then(async () => {
      console.log("database initialized!");
    })
    .catch((error) => console.log(error));
});
