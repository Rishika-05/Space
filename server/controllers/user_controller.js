const User = require('../models/User');
const bcrypt = require('bcrypt');
module.exports.login = (req,res)=>{
    const { email, password } = req.body
    User.findOne({ email: email }, async function (err, user) {
        try {
            if (user) {
                const chk = await bcrypt.compare(password, user.password);
                if (chk) {
                    res.send({ message: "Login Successfull", user: user })
                }
                else {
                    res.send({ message: "Password didn't match" })
                }
            }
            else {
                res.send({ message: "User not registered" })
            }
        } catch {

        }
    })
}
module.exports.signUp = async (req,res)=>{
    try {
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        User.findOne({ email: email }, (err, user) => {
            if (user) {
                res.send({ message: 'User already registered' })
            }
            else {
                const user = new User({
                    name,
                    email,
                    password: hashedPassword
                })
                for(let i=1;i<=365;i++){
                    user.calender.push({day:i,value:0});
                }
                user.save(err => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send({ message: 'successfully registered' })
                        res.redirect('/user/login')
                    }
                })
            }
        })
    } catch {

    }
}