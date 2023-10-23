import express from "express";
import dotenv from "dotenv";

dotenv.config();
const { PORT } = process.env;
const app = express();

app.use(express.json());
app.listen(PORT || 5000, () => console.log(`App started on Port ${PORT} `));