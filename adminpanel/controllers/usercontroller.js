let userModel = require('../models/usermodels');
let registerModel = require('../models/registermodels');
let tokenModel = require('../models/tokenmodels');

const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const saltRounds = 10;

const crypto = require('crypto');
const secret_key = "secret1234";
//Encrypting text
const encrypt_text = async (plainText, password) => {
    try {
        const iv = crypto.randomBytes(16);
        const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

        let encrypted = cipher.update(plainText);
        encrypted = Buffer.concat([encrypted, cipher.final()])
        return iv.toString('hex') + ':' + encrypted.toString('hex');

    } catch (error) {
        console.log(error);
    }
}
// Decrypting text
const decrypt_text = async (encryptedText, password) => {
    try {
        const textParts = encryptedText.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');

        const encryptedData = Buffer.from(textParts.join(':'), 'hex');
        const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

        const decrypted = decipher.update(encryptedData);
        const decryptedText = Buffer.concat([decrypted, decipher.final()]);
        return decryptedText.toString();
    } catch (error) {
        console.log(error)
    }
}

const checkUser = async (req, res) => {
    if (req.cookies) {
        if (req.cookies.UserName === undefined || req.cookies.UserName === 'undefined') {
            res.clearCookie('UserName');
            res.redirect('/');
            return false;
        }
        return true;
    }
}

const dataUser = async (req, res) => {
    if (req.cookies && req.cookies.UserName != 'admin') {
        return res.redirect('/');
    }
};

const getDashboard = async (req, res) => {

    var a = await checkUser(req, res);
    if (a === true) {
        res.render('index', { username: req.cookies.UserName, selected: 'admin' });
    } else {
        res.render('index', { username: req.cookies.UserName, selected: 'admin' })
    }
};

const getdata = async (req, res) => {
    await checkUser(req, res)
    res.render('form', { username: req.cookies.UserName, selected: 'form' });
}

const gettable = async (req, res) => {
    await checkUser(req, res)
    res.render('table', { username: req.cookies.UserName, selected: 'table' });
}

const getchart = async (req, res) => {
    await checkUser(req, res)
    res.render('chart', { username: req.cookies.UserName, selected: 'chart' });
}


const getwidgets = async (req, res) => {
    await checkUser(req, res)
    res.render('widget', { username: req.cookies.UserName, selected: 'widget' });
}

const getbutton = async (req, res) => {
    await checkUser(req, res)
    res.render('button', { username: req.cookies.UserName, selected: 'button' });
}

const gettypography = async (req, res) => {
    await checkUser(req, res)
    res.render('typography', { username: req.cookies.UserName, selected: 'typography' });
}


const getotherElement = async (req, res) => {
    await checkUser(req, res)
    res.render('element', { username: req.cookies.UserName, selected: 'element' });
}

const getprofile = async (req, res) => {
    await checkUser(req, res)
    res.render('profile', { username: req.cookies.UserName, selected: 'profile' });
}

const transpoter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: "makwanajaydip1510@gmail.com",
        pass: 'iovdaxolhzltlptu',
    },
    secure: true,
});

const getpostdata = async (req, res) => {
    const checkUser = await userModel.findOne({ email: req.body.email, password: req.body.password });
    // console.log("Check user" + checkUser);
    if (checkUser) {
        req.flash('emsg_token', 'Email already registered');
        emsg_token = req.flash('emsg_token');
    } else {
        const result = new userModel({
            id: 1,
            email: email,
            password: password,
            username: username,
        });
        const res1 = await result.save()
        console.log("data saved" + res1);
        res.redirect('login');
    }
}

const registerdata = async (req, res) => {
    const { username, password, email } = req.body
    const chackdata = await registerModel.findOne({ email });
    console.log("chack User" + chackdata);
    if (chackdata) {
        return res.send("Email already registered");
    } else {
        const crypted = await bcrypt.hash(password, saltRounds)
        const res2 = new registerModel({
            id: 1,
            email: email,
            password: crypted,
            username: username,
        });
        const mailInfo = {
            from: "makwanajaydip1510@gmail.com",
            to: email,
            subject: "Admin Panel",
            text: "Regidtration",
            html: "<a>click here registere"
        }
        await transpoter.sendMail(mailInfo);
        const abc = await res2.save()
        console.log("data saved" + abc);
        res.redirect('login');
    }

}

const checkUserData = async (req, res) => {
    const dataUser = await registerModel.findOne({ email: req.body.email, password: req.body.password });
    if (dataUser) {
        res.cookie('UserName', dataUser.username);
        res.redirect('/admin');
    } else {
        req.flash('danger', 'Email or password wrong !!!');
        res.render('login', { message: req.flash('danger') });
    }
}

const checkLogindata = async (req, res) => {
    let userdata = await registerModel.findOne({ email: req.body.email });
    if (!userdata) {
        req.flash('emsg_token', 'user not found');
        emsg_token = req.flash('emsg_token');
    } else {

        const isPasswordValid = await bcrypt.compare(req.body.password, userdata.password);

        if (!isPasswordValid) {
            res.send("Invalid passworda");
        } else {
            res.cookie('UserName', userdata.username);
        }
    }
    res.redirect('admin');

}

function createOtp() {
    var min = 100000;
    var max = 999999;
    otp = Math.floor(Math.random() * (max - min)) + min;
    return otp;
}

const sendOtp = async (req, res) => {
    email = req.body.email;
    let getdata = await registerModel.findOne({ email: req.body.email })
    if (!getdata) {
        req.flash('emsg_token', 'User not found');
        emsg_token = req.flash('emsg_token');
    } else {
        otp = createOtp();
        /**
         * Update otp into the database then send email.
         */
        try {
            //const updata = await registerModel.updateOne({ email: email }, { $set: { otp: otp } });
            //console.log(updata);
            let tok_exists = await tokenModel.findOne({ email: email })
            if (tok_exists) {
                let del_tok = await tokenModel.deleteMany({ email: email });
                console.log(del_tok);
            }
            const result = new tokenModel({
                email: email,
                otp: otp
            });
            const res1 = await result.save()
            console.log("data saved" + res1);
        } catch (e) {
            console.log(e);
        }
        const transporter = nodemailer.createTransport({
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: "makwanajaydip1510@gmail.com",
                pass: 'iovdaxolhzltlptu',
            },
            secure: true,
        });
        const crypted = await encrypt_text(email, secret_key);

        var href = `http://localhost:8004/resetcred?token=${crypted}`;
        const mailInfo = {
            from: "kanjariyanilesh@gmail.com",
            to: email,
            subject: `Reset password Admin panel`,
            html: `<p>your OTP is ${otp} <a href="${href}">Reset Password</a></p>`
        }
        await transporter.sendMail(mailInfo)
        req.flash('smsg_forget', 'Password reset link has been shared to your registerd email address, please check your email account.');
        res.render('forget', { message: req.flash('smsg_forget') });
    }

}

const vaildtoken = async (req, res) => {
    var emsg_token = '';
    console.log(req.query.token);
    if (req.query.token) {
        var token = req.query.token.toString();
        const dcrypted = await decrypt_text(token, secret_key);
        console.log(dcrypted);
        if (!dcrypted) {
            req.flash('emsg_token', 'Invaild token');
            emsg_token = req.flash('emsg_token');
        }
        res.render('resetpassword', { email: dcrypted, message: emsg_token });
    } else {
        console.log("body is:-");
        console.log(req.body.email);
        console.log(req.body.otp);
        console.log(req.body.password);
        console.log(req.body.cpassword);
        // step 1: check otp in schema: tokendatas
        let tok_exists = await tokenModel.findOne({ email: req.body.email })
        if (tok_exists) {
            console.log(tok_exists);
            if (req.body.otp == tok_exists.otp) {
                let del_tok = await tokenModel.deleteMany({ email: req.body.email });
                console.log(del_tok);
                // step 2 : password update in schema registerdatas
                let getdata = await registerModel.findOne({ email: req.body.email })
                if (!getdata) {
                    req.flash('emsg_token', 'User not found');
                    emsg_token = req.flash('emsg_token');
                } else {
                    const hash_pwd = await bcrypt.hash(req.body.password, saltRounds)
                    const updata = await registerModel.updateOne({ email: email }, { $set: { password: hash_pwd } });
                    res.render('login',{message:''});
                    console.log(updata);
                }
            } else {
                console.log("otp not found");
            }

        } else {
            console.log("Invalid token");
        }


    }

    //let token = await

}

module.exports = {
    getDashboard,
    getdata,
    getpostdata,
    gettable,
    checkUserData,
    registerdata,
    getchart,
    getwidgets,
    getbutton,
    gettypography,
    getotherElement,
    dataUser,
    checkLogindata,
    getprofile,
    sendOtp,
    vaildtoken
}