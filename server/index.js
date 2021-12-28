const express = require('express');
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' });
const cors = require('cors');
const app = express();
const connectToMongo = require('./config/mongoose');
const port = process.env.PORT || 9002;
const {RtcTokenBuilder, RtcRole} = require('agora-access-token');
app.use(cors());
connectToMongo();

app.use(express.json());
app.use('/', require('./routes'));
const nocache = (req, resp, next) => {
    resp.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    resp.header('Expires', '-1');
    resp.header('Pragma', 'no-cache');
    next();
};

const generateAccessToken = (req, resp)  =>{
    console.log("Hello");
    resp.header('Access-Control-Allow-Origin', '*');
    const channelName = req.query.channelName;if (!channelName) {
        return resp.status(500).json({ 'error': 'channel is required' });
    }
    let uid = req.query.uid;
    if(!uid || uid == '') {
        uid = 0;
    }
    // get role
    let role = RtcRole.SUBSCRIBER;
    if (req.query.role == 'publisher') {
        role = RtcRole.PUBLISHER;
    }
    // get the expire time
    let expireTime = req.query.expireTime;
    if (!expireTime || expireTime == '') {
        expireTime = 3600;
    } else {
        expireTime = parseInt(expireTime, 100);
    }
    // calculate privilege expire time
    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTime + expireTime;
    const token = RtcTokenBuilder.buildTokenWithUid(process.env.APP_ID, process.env.APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);
    return resp.json({ 'token': token });
 };
app.get('/access_token', nocache, generateAccessToken);

app.listen(port, () => {
    console.log(`Space app listening at http://localhost:${port}`);
})
