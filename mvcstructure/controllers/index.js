const getuser =(req,res)=>{
    res.status(200).json({msg:"getuser function calling..."});
    console.log("all getdata successfully called");
}

const getemp =(req,res)=>{
    res.status(200).json({msg:" getemp function calling..."});
    console.log("all getemp successfully called");
}

module.exports={
    getuser,
    getemp
}