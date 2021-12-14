// const User = require('../models/user')
//const Question = require('../models/Question')
const fetch = require("node-fetch");

// client id  :   7eaec65631d56c14ef7463193fc91eb2
// client secret : fa768de84ea9ef5cd0e4fb7ef12d7a7c13f9e33d4e30dd411a8a6d4a94dba86a
// https://api.jdoodle.com/v1/execute

module.exports.getResult = async (req, res) => {
    try {
        const { script, language, stdin, versionIndex } = req.body;
        let script2 = script;

        let data = {
            clientId: "7eaec65631d56c14ef7463193fc91eb2",
            clientSecret: "fa768de84ea9ef5cd0e4fb7ef12d7a7c13f9e33d4e30dd411a8a6d4a94dba86a",
            script: script2,
            language,
            stdin,
            versionIndex: versionIndex
        }
        // console.log(JSON.stringify(data));
        let output = await fetch(`https://api.jdoodle.com/v1/execute`, {
            method: "POST", body: JSON.stringify(data), headers: {
                'Content-Type': 'application/json'
            },
        });
        let apiOut = await output.json();
        res.send({ apiOut: apiOut });

    }
    catch (err) {
        console.log(err)
    }
}

/*
{
    "sourceCode": "print('hello world');",
    "status": 0,
    "errorCode": 0,
    "error": null,
    "outputType": 0,
    "output": "hello world\n",
    "outputStyle": null,
    "date": "0001-01-01T00:00:00",
    "language": "py",
    "input": "",
    "id": 0
}
*/