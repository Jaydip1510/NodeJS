const registerdata = async (req, res) => {
        const res2 = new registerModel({
        id:(userdata.length + 1).toString(),
        name: req.body.name,
        relesedate: req.body.date,
        posterimage: req.body.img,
    });
    const abc = await res2.save()
    console.log("data saved" + abc);
    res.redirect('table');
}

module.exports={
    registerdata
}