import express from "express";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorHandlers.js";
import contactformRouter from "./routes/contactform.js";
const app = express();

// MIDDLEWARE
const origin = "https://izokirov.me";
const localhost = "http://localhost:3000";
app.use(cors());

app.use(express.json());

// ROUTE HANDLERS
app.get("/", (req, res) => {
    res.send("Ok");
});
app.use("/api", contactformRouter);

// ERROR HANDLERS
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Environment: ${process.env.NODE_ENV}  \nServer PORT: ${PORT}`)
);
