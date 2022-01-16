const User = require('../models/User');
const Solution = require('../models/Solution');
//const Question = require('../models/Question')
// const fetch = require(`node-fetch`);
const fs = require('fs')
const { NodeSSH } = require('node-ssh')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' });

// client id  :   7eaec65631d56c14ef7463193fc91eb2
// client secret : fa768de84ea9ef5cd0e4fb7ef12d7a7c13f9e33d4e30dd411a8a6d4a94dba86a
// https://api.jdoodle.com/v1/execute

let params = null
let SSH = null 
let queue = []

const connect = () => new Promise((resolve, reject) => {
    if (getConnectionParams()) {
        let ssh = new NodeSSH()
        ssh.connect(getConnectionParams()).then(() => {
            setSSH(ssh)
            resolve(true)
        }).catch(err => {
            console.log('SSH connection error:', err)
            reject(err)
        })
    } else {
        resolve(false)
    }
})
 

const processQueue = async () => {
    await connect()
    queue = getQueue()
 
    while (queue.length > 0) {
        if (queue[0][0] === 'command') {
            let command = queue[0][1];
            console.log(command);
            await getSSH().execCommand(command, { cwd: '/home/user/cloud' }).then( async (result) =>{

                const { script, language, stdin, versionIndex, userID } = queue[0][4].body;
                

                let res = queue[0][3];
                output = result.stdout;
                error = result.stderr;
                console.log(error);
                if (error.length > 0) {
                    error = error.replace(`${userID}`, `main`);
                    error = error.replace(`${userID}`, `main`);
                    res.send({ cloudOut: error, cloudErr: error, verdict: 0 });
                }
                else if (language === `python3`) {
                    console.log(`ou ` + output);
                    let verdict;
                    if (output.charAt(output.length - 1) === `0`) {
                        verdict = 1;
                        output = output.slice(0, output.length - 1);
                    }
                    else if (output.charAt(output.length - 1) === `4`) {
                        verdict = -1;
                        output = ``;
                    }
                    res.send({ cloudOut: output, cloudErr: error, verdict: verdict });
                }
                else if (language === `cpp17`) {
                    //exec
                    await getSSH().execCommand(`timeout 1 ./${userID} < input.txt && echo $? || echo $?`, { cwd: '/home/user/cloud' }).then(async (resultE)=> {

                        let output1 = resultE.stdout;
                        let error1 = resultE.stderr;
                        console.log(`ou ` + output1);
                        let verdict;
                        if (output1.charAt(output1.length - 1) === `0`) {
                            verdict = 1;
                            output1 = output1.slice(0, output1.length - 1);
                        }
                        else if (output1.charAt(output1.length - 1) === `4`) {
                            if (output1.charAt(output1.length - 2) === '2') {
                                verdict = -1;
                                output1 = ``;
                            }
                            else if (output1.charAt(output1.length - 2) === '3') {
                                verdict = -2;
                                output1 = ``;
                            }
                        }
                        else {
                            verdict = -2;
                            resultE.stderr = resultE.stderr.replace(`timeout: the monitored command dumped core`, ``);
                            resultE.stderr = resultE.stderr.replace(`timeout 1 ./${userID} < input.txt`, ``);
                            resultE.stderr = resultE.stderr.replace(`bash: line 1:  `, ``);
                            output1 = resultE.stderr;
                        }
                        res.send({ cloudOut: output1, cloudErr: error1, verdict: verdict });
                    })
                        .catch(function (err) {
                            res.send({ message: 400 });
                            console.log(err);
                        })
                }
                else if (language === 'java') {
                    await getSSH().execCommand(`timeout 1 java main < input.txt && echo $? || echo $?`, { cwd: '/home/user/cloud' }).then( async (resultE)=> {
                        let output1 = resultE.stdout;
                        let error1 = resultE.stderr;
                        console.log(`ou ` + output1);
                        console.log(`err` + error1);
                        let verdict;
                        if (output1.charAt(output1.length - 1) === `0`) {
                            verdict = 1;
                            output1 = output1.slice(0, output1.length - 1);
                        }
                        else if (output1.charAt(output1.length - 1) === `4`) {
                            if (output1.charAt(output1.length - 2) === '2') {
                                verdict = -1;
                                output1 = ``;
                            }
                            else if (output1.charAt(output1.length - 2) === '3') {
                                verdict = -2;
                                output1 = ``;
                            }
                        }
                        else {
                            verdict = -2;
                            output1 = resultE.stderr;
                        }
                        res.send({ cloudOut: output1, cloudErr: error1, verdict: verdict });
                    }).catch(function (err) {
                        res.send({ message: 400 });
                        console.log(err);
                    })
                }



            }).catch((err)=>{
                console.log(err);
            })
        } else if (queue[0][0] === 'upload') {
            let local = queue[0][1]
            let remote = queue[0][2]
            await getSSH().putFile(local, remote, null, { concurrency: 1 }).then((result)=>{
                console.log("The file thing is done");

            })
            .catch((err)=>{
                console.log(err);
            })
        } else if (queue[0][0] === 'download') {
            let local = queue[0][2]
            let remote = queue[0][1]
            await getSSH().getFile(local, remote, null, { concurrency: 1 })
        }
        queue.shift()
        setQueue(queue)
        queue = getQueue()
    }
    disconnect()
}


const disconnect = () => {
    if (getSSH()) {
        getSSH().dispose()
        setSSH(null)
        setQueue([])
        return true
    } else {
        return false
    }
}

const exec = (type, command, command2, res,req) => {
    const connection = getConnectionParams()
    if (connection) {
        if (command2 === null) {
            addToQueue([type, command, null, res, req])
        } else {
            addToQueue([type, command, command2, res, req])
        }
        return true
    } else {
        return false
    }
}

const setConnectionParams = newParams => {
    params = newParams
}
const setSSH = newSSH => {
    SSH = newSSH
}
const setQueue = newQueue => {
    queue = newQueue
}
const addToQueue = async (command) => {
    let queue = getQueue()
    queue.push(command)
    setQueue(queue)
    if (queue.length === 1) {
        processQueue()
    }
}

const getConnectionParams = () => params
const getSSH = () => SSH
const getQueue = () => queue
const getQueueLength = () => queue.length


module.exports.getResult = async (req, res) => {
    
    let output;
    let error;
    try {
        const { script, language, stdin, versionIndex, userID } = req.body;
        let assign = {
            fileName: ``,
            command: ``,
        }
        if (language === 'cpp17') {
            assign.fileName = `${userID}.cpp`
            assign.command = `g++ ${userID}.cpp -o ${userID}`
        }
        else if (language === 'python3') {
            assign.fileName = `${userID}.py`
            assign.command = `timeout 1 python3 ${userID}.py < input.txt && echo $? || echo $?`
        }
        else if (language === 'java') {
            assign.fileName = `main.java`
            assign.command = `javac main.java`
        }
        fs.writeFile(assign.fileName, script, function (err) { 
            if (err) {
                console.log(err);
            } else {
                console.log('${userID} file created');
            }
        })
        fs.writeFile('input.txt', stdin, function (err) {
            if (err) console.log(err);
            else {
                console.log('input file created');
            }
        })   
        setConnectionParams({
            host: process.env.VM_HOST_IP,
            username: process.env.SSH_CONNECTOR_USERNAME, 
            port: process.env.SSH_CONNECTION_PORT,
            privateKey: fs.readFileSync('./id_rsa', 'utf8'),
        });
        getConnectionParams();
        exec('upload', `./${assign.fileName}`, `/home/user/cloud/${assign.fileName}`,res,req)
        exec('upload', './input.txt', '/home/user/cloud/input.txt',res,req)
        exec('command', assign.command,null,res,req) 


    }
    catch (err) {
        res.send({ message: 400 });
        console.log(err)
    }

}
const dayOfYear = function (today) {
    return Math.ceil((today - new Date(today.getFullYear(), 0, 1)) / 86400000);
}


module.exports.solved = async (req, res) => {
    let solData = req.body;
    try {
        let user = await User.findById(solData.user);
        let index = user.questionsSolved.indexOf(solData.question);
        if (index === -1) {
            user.questionsSolved.push(solData.question);
            user.save((err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }

                res.send(result);
            });
            var a = dayOfYear(new Date());
            // console.log(a);

            for (let i = 0; i < user.calender.length; i++) {
                if (user.calender[i].day === a) {
                    user.calender[i].value++;
                    break;
                }
            }
        }


    } catch (err) {
        console.log(err);
    }
}
module.exports.solutionLog = async (req, res) => {
    let solData = req.body;
    try {
        const solution = new Solution(solData);

        let user = await User.findById(solData.user);
        user.solutions.push(solution._id);
        user.save();
        solution.save(err => {
            if (err) {
                console.log(err);
            }
        })

    } catch (err) {
        console.log(err);
    }
}


/*




module.exports = {
  setConnectionParams,
  getConnectionParams,
  connect,
  disconnect,
  exec,
  getQueueLength
}


*/