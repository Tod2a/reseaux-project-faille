const toolbox = require("../self_modules/toolbox");
const jwt = require('jsonwebtoken');
const data = require("../data.json");
const _ = require("lodash");
let blogMessages = [];
const logInAttemptMap = new Map();

exports.connectUser = (req, res) => {
    let body = req.body;
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (logInAttemptMap.has(ip)) {
        logInAttemptMap.set(ip, logInAttemptMap.get(ip) + 1);
    }
    else {
        logInAttemptMap.set(ip, 1);
    }
    let user = null;
    let d = new Date();
    console.log("[" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "] > " + ip + " tried logging in with the following mail/password : " + body.mail + "/" + body.password + ". This IP tried to log in " + logInAttemptMap.get(ip) + " times.");
    if (!toolbox.checkMail(body.mail)) {
        res.status(400).send('The mail doesn\'t use a correct format');
        return;
    }

    data.forEach(el => {
        if (el.mail === body.mail) {
            user = el;
        }
    });

    if (user == null) {
        console.log(body.mail + " does not exist.")
        res.status(404).send('This user does not exist');
    } else {
        const hashedInput = toolbox.badHash(body.password);
        if (hashedInput === Number(user.password)) {
            console.log(body.mail + " exists and the password is right.")
            const token = jwt.sign({ user_id: user.id, user_role: user.role }, process.env.ACCESS_TOKEN_SECRET);
            res.status(200).json({ token, role: user.role });
        } else {
            console.log(body.mail + " exists but the password is wrong.")
            res.status(403).send('Invalid authentication');
        }
    }
};

exports.fetchDataUser = (req, res) => {
    let usr = null;
    data.forEach(el => {
        if (el.id === req.body.user_id) {
            usr = _.cloneDeep(el);
        }
    });

    if (usr == null) {
        res.status(500).send('Wrong cookies data. Please contact the webmaster');
    } else {
        delete usr.password;
        res.status(200).json(usr);
    }
};

exports.getVictory = (req, res) => {
    let usrList = [];
    data.forEach(el => {
        let usr = _.cloneDeep(el);
        delete usr.password;
        usrList.push(usr);
    });
    res.status(200).json(usrList);
};

exports.fetchBlogMessages = (req, res) => {
    res.status(200).json(blogMessages);
};

exports.createBlogmessage = (req, res) => {
    let body = req.body;
    if (body.message === null || body.message === "") {
        res.status(400).send('Cannot add an empty message');
    } else {
        blogMessages.push(body.message);
        res.status(200).send("Message Added");
    }
};
