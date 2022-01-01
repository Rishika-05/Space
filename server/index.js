const express = require('express');
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' });
const cors = require('cors');
const app = express();
const connectToMongo = require('./config/mongoose');
const port = process.env.PORT || 9002;
const idePort = process.env.IDE_PORT || 9001;
const ideServer = require('http').Server(app);
const ideSockets = require('./config/ide_sockets.js').chatSockets(ideServer);
app.use(cors());
connectToMongo();

app.use(express.json());
app.use('/', require('./routes'));

ideServer.listen(9001,()=>{
    console.log("Started");
})
app.listen(port, () => {
    console.log(`Space app listening at http://localhost:${port}`);
})
