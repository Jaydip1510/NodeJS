const express = require('express');
const body = require('body-parser');
const routes = express.Router();
const multer = require('multer');
const model = require('../models/usermodel');

const bs = body.urlencoded({ extended: true });

let iname = '';
const storage = multer.diskStorage({

 });
 const upload = multer({ storage: storage });
console.log(iname);
const { data,deldata, editdata } = require("../controllers/controller");
routes.get('/moviecrud', data);
routes.get('/del/:id', deldata);
routes.get('/edit/:id', editdata);
routes.post('/savedata', upload.single('image'), async (req, res) => {

    let id = req.body.hid;
    let name = req.body.name;

    if (id != '') {

        let user = await model.findOne({ _id: new mongodb.ObjectId(id) });

        old = (user.image != '') ? user.image : '';

        if (req.file && iname != '') {
            let img1 = "uploads/" + user.image;

            fs.unlink(img1, () => {
                console.log("delete");
            });
        }
        await model.findOneAndUpdate(_id ,
            {
                $set: {
                    id: (user.length) + 1,
                    moviename: req.body.name,
                    date: req.body.date,
                    charactor: req.body.charactor,
                    pimage: (req.file && iname != '') ? iname : old
                }
            });

    } else {
        if (name != '') {
            let data = new model({
                id: 1,
                moviename: req.body.name,
                date: req.body.date,
                charactor: req.body.charactor,
                pimage: iname
            })

           let b= await data.save();
        }
    }
    user = '';
    res.redirect('/moviecrud')
});
module.exports = routes;