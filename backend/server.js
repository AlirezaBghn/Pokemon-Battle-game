import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use(errorHandler);

const PORT = process.env.PORT || 2006;
app.listen(PORT, () => console.log(`íº€ Server running on port ${PORT}`));

