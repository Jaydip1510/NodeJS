const roleModel = require('../models/rolemodel');
const registerModel = require('../models/registermodel');
const module_masterModel = require('../models/module_master');
const express = require('express');
const { set } = require('mongoose');
const path = require("path");
const app = express();

const roledata = async (req, res) => {
    const allModules = await module_masterModel.find({});
    console.log(allModules);
    res.render('role', { alldata: '', edit: '', allModules: allModules });
}

const roleinfo = async (req, res) => {
    const allModules = await module_masterModel.find({});
    let tmpPerm = { view: 0, edit: 0, delete: 0 };
    let id = req.params.id != '' && req.params.id != undefined ? req.params.id : -1;
    const rolename = req.body.rolename;
    let permissionObject = {};
    allModules.forEach(element => {
        let tperm = JSON.parse(JSON.stringify(tmpPerm));
        let view_id = `view_${element._id}`,
            edit_id = `edit_${element._id}`,
            delete_id = `delete_${element._id}`;
        //Check View permission
        if (req.body[view_id] !== undefined && req.body[view_id] === 'on') {
            tperm.view = 1;
        }
        //Check Edit permission
        if (req.body[edit_id] !== undefined && req.body[edit_id] === 'on') {
            tperm.edit = 1;
        }
        //Check Delete permission
        if (req.body[delete_id] !== undefined && req.body[delete_id] === 'on') {
            tperm.delete = 1;
        }
        permissionObject[element._id] = tperm;
    });

    if (id == -1) {

        const result = {
            rolename: rolename,
            permission: permissionObject
        }
        const savedata = new roleModel(result);
        await savedata.save();
    } else {
        let chkData = await roleModel.findOne({ _id: id });
        if (chkData) {
            await roleModel.updateOne({ _id: id }, {
                $set: {
                    rolename: rolename,
                    permission: permissionObject
                }
            });
        }

    }
    res.redirect('/allroledisplay');
}

const roledisplay = async (req, res) => {
    const role = await roleModel.find();
    res.render('roledata', {
        data: role,
        alldata: ''
    })
}

const roledelete = async (req, res) => {
    let id = req.params.id;
    await roleModel.findByIdAndRemove({ _id: id });
    res.redirect('/allroledisplay');
}

const editrole = async (req, res) => {
    const allModules = await module_masterModel.find({});
    let id = req.params.id;
    let alldata = await roleModel.findOne({ _id: id });
    console.log(alldata);
    if (!alldata) {
        res.send('No Data Found');
    } else {
        console.log(alldata);
        res.render('role', { alldata: alldata, edit: 'edit', allModules: allModules });
    }
}

const role2user = async (req, res) => {
    let user_id = req.params.user_id;
    let roleData = await roleModel.find();
    const userData = await registerModel.find({ _id: user_id }).populate('role_id');
    console.log(userData);
    userData.forEach(element => {
        console.log(element._id);
    });
    res.render('role2user', { roleData: roleData, userData: userData[0] });
}
const role2userdisplay = async (req, res) => {
    const role2UserData = await registerModel.find().populate('role_id');
    console.log(role2UserData);
    res.render('role2userdisplay', { role2User: role2UserData });
}
const role2user_create_update = async (req, res) => {

    const user_id = req.body.user_id;
    const role_id = req.body.role_id;
    let chkData = await registerModel.findOne({ _id: user_id });
    if (chkData) {
        await registerModel.updateOne({ _id: user_id }, {
            $set: {
                role_id: role_id,
            }
        });
    }

    res.redirect('/allroledisplay');
}
module.exports = { roledata, roleinfo, roledisplay, roledelete, editrole, role2user, role2userdisplay, role2user_create_update }