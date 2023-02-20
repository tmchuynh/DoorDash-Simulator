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
    if(err) {
        return console.log(err);
    }
    console.log(`Listening on port ${port}`);
});