const express = require('express');

const dotenv = require('dotenv');


const app = express();
dotenv.config({ path: './config.env' });
const port = process.env.PORT || 5000;



app.use(express.json());
app.use('/',require('./routes'));

app.listen(port, () => {
    console.log(`Space app listening at http://localhost:${port}`);
})