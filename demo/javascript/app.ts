import express, {Express} from "express";
import {rollTheDice} from "./dice";

const PORT: number = parseInt(process.env.PORT || "8080");
const app: Express = express();

app.get("/rolldice", (req, res) => {
  const rolls = req.query.rolls ? parseInt(req.query.rolls.toString()) : NaN;
  if (isNaN(rolls)) {
    console.error("rolls must be passed as a query paramter, ?rolls=number");
    res
      .status(400)
      .send("Request parameter 'rolls' is missing or not a number.");
    return;
  }
  console.log("dice successfully rolled");
  res.send(JSON.stringify(rollTheDice(rolls, 1, 6)));
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
