import { DoorDashClient } from "@doordash/sdk";
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import express from 'express';
import path from 'path';
const app = express();
const port = 3000;
import { fileURLToPath } from 'url';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
        pickup_address: "11 Madison Ave, New York, NY 10001",
        pickup_phone_number: "+1(650)5555555",
        pickup_business_name: "Doordash",
        dropoff_address: `${req.body.street}, ${req.body.city}, ${req.body.zip}`,
        dropoff_phone_number:  "7148582418",
        dropoff_contact_given_name: req.body.dropoff_contact_given_name,
        dropoff_contact_family_name: req.body.dropoff_contact_family_name,
        order_value: req.body.order_value,
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
        "ab4c319d-4ea6-4ab3-89c7-239fce3ccbd0"
    );

    res.send(response);
    console.log("accept", response);
})