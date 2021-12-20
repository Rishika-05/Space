const User = require('../models/User.js');
const Solution = require('../models/Solution');
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
const dayOfYear = function(today){
    return Math.ceil((today - new Date(today.getFullYear(),0,1)) / 86400000);
}


module.exports.solved = async (req,res)=>{
    let solData = req.body;
    try{
        let user = await User.findById(solData.user);
        let index = user.questionsSolved.indexOf(solData.question);
        if(index == -1){
            user.questionsSolved.push(solData.question);
        
            var a = dayOfYear(new Date());
            // console.log(a);
            if(a == 1){
                for(let i = 0;i<user.calender.length;i++){
                    user.calender[i].value = 0;
                }
            }
            for(let i = 0;i<user.calender.length;i++){
                if(user.calender[i].day == a){
                    user.calender[i].value++;
                    break;
                }
            }
        }
        user.save();
    }catch(err){
        console.log(err);
    }
}
module.exports.solutionLog = async (req,res)=>{
    let solData = req.body;
    try{
        const solution = new Solution(solData);
        
        let user = await User.findById(solData.user);
        user.solutions.push(solution._id);
        user.save();
        solution.save(err => {
            if (err) {
                console.log(err);
            } else {
                console.log("Solution created successfully");
            }
        })
        
    }catch(err){
        console.log(err);
    }
}


