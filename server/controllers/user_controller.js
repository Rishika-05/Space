const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'team.space.793@gmail.com',
        pass: 'space.793'
    }
});

module.exports.check = (req, res) => {
    const { token } = req.body;
    if (token === undefined || req.body === undefined) {
        res.send({ message: 404 })
    }
    else {
        const user = jwt.verify(token, "myKey");
        // console.log(user.user);
        const passU = user.user
        res.send({ message: 200, user: passU });
    }
}

module.exports.login = (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email }, async function (err, user) {
        try {
            if (user) {
                const chk = await bcrypt.compare(password, user.password);
                if (chk) {
                    let token = jwt.sign({ user }, "myKey");
                    res.send({ message: "Login Successfull", user: user, token: token })
                }
                else {
                    res.send({ message: "Incorrect password" })
                }
            }
            else {
                res.send({ message: "User not registered" })
            }
        } catch {

        }
    })
}
module.exports.signUp = async (req, res) => {
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
                for (let i = 1; i <= 365; i++) {
                    user.calender.push({ day: i, value: 0 });
                }
                user.save(err => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send({ message: 'User registered successfully!' })
                    }
                })
            }
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports.code = async (req, res) => {

    const { email, r } = req.body
    var mailOptions = {
        from: 'team.space.793@gmail.com',
        to: email,
        subject: "Space Login Verification Code",
        text: `Your Code is ${r}`
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.send({ done: 0, detail: error });
            console.log(error);
        }
        else {
            res.send({ done: 1, detail: info });
            console.log(info);
        }
    })

}