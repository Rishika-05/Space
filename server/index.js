const express = require('express');
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' });

const app = express();
const connectToMongo = require('./config/mongoose');
const port = process.env.PORT || 5000;

connectToMongo();

app.use(express.json());

app.listen(port, () => {
    console.log(`Space app listening at http://localhost:${port}`);
})