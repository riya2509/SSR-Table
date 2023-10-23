import express from "express";
import dotenv from "dotenv";
import appRoutes from "./app/routes/appRoutes.js";
// import { data } from "./fakeTable.js";
// import { faker } from "@faker-js/faker";

dotenv.config();
const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use("/test", appRoutes);

app.listen(PORT || 5000, () => console.log(`App started on Port ${PORT} `));
