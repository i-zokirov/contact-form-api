import express from "express";
import asyncHandler from "express-async-handler";
import moment from "moment";

import GoogleSheet from "../services/GoogleSheet.js";
// import dotenv from "dotenv";
// dotenv.config();
const router = express.Router();
const gsheet = new GoogleSheet(process.env.spreadsheet);

router.get("/contactform", (req, res) => {
    res.send("OK");
});

router.post(
    "/contactform",

    asyncHandler(async (req, res) => {
        if (req.query.auth !== process.env.auth) {
            throw new Error("Not Authorized");
        }
        const { message, email, name } = req.body;

        const newContact = {
            name,
            email,
            message,
            state: "new",
            date: moment(new Date()).format("LLL"),
        };

        const row = gsheet.convertObjectToRows(newContact);

        await gsheet.appendRow(row, "contact-form-data!A:E");

        res.status(200);
        res.json({ success: true });
    })
);

export default router;
