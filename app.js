import { DoorDashClient } from "@doordash/sdk";
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import express from 'express';
import path from 'path';
const app = express();
const port = 3000;
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Listening on port ${port}`);
});

app.use(express.static(__dirname + "/public"));

app.post("/get-delivery-rate", async (req, res) => {
    const client = new DoorDashClient({
        developer_id: process.env.DEVELOPER_ID,
        key_id: process.env.KEY_ID,
        signing_secret: process.env.SIGNING_SECRET,
    });

    const response = await client.deliveryQuote({
        external_delivery_id: uuidv4(),
        pickup_address: "1000 4th Ave, Seattle, WA, 98104",
        pickup_phone_number: "+1(650)5555555",
        dropoff_address: "1201 3rd Ave, Seattle, WA, 98101",
        dropoff_phone_number: "+1(650)5555555",
    });

    res.send(response);
    console.log("quote", response);
})

app.post("/create-delivery", async (req, res) => {
    const client = new DoorDashClient({
        developer_id: process.env.DEVELOPER_ID,
        key_id: process.env.KEY_ID,
        signing_secret: process.env.SIGNING_SECRET,
    });

    const response = await client.deliveryQuoteAccept(
        "ec08aa0b-acd1-4dc8-bd5c-c01ba0b439d8"
    );

    res.send(response);
    console.log("accept", response);
})