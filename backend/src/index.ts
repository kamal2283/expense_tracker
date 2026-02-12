import "dotenv/config";
import express from "express";
import cors from "cors";
import expensesRouter from "./routes/expenses";
import dashboardRouter from "./routes/dashboard";
import { errorHandler, HttpError } from "./middleware/errorHandler";

const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/expenses", expensesRouter);
app.use("/dashboard", dashboardRouter);

app.use((_req, _res, next) => {
  next(new HttpError(404, "Route not found"));
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
