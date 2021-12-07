const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
const dotenv = require('dotenv')

const app = express();
const port = process.env.PORT || 5000;

dotenv.config({ path: './config.env' });

app.use(express.json());

app.listen(port, () => {
    console.log(`Space app listening at http://localhost:${port}`);
})