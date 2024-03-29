import "express-async-errors";
import express from "express";
import cors from "cors";
import { router } from "./router";
import { filterException } from "../filters/filter-exception";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(filterException);

export { app };
