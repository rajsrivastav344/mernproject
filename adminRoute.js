const Admin = require('../models/Admin');
const express = require('express');
// console.log(express)
const router = express.Router();

router.get('/', async(req,res)=>{

    return res.json("Api Called")
})

router.post('/',async(req,res)=>{
    const reg = await new Admin(req.body)
    reg.save();

    return res.json("Admin Registered Successfully")
});

router.post('/login', async(req,res)=>{
    const {email, password} = req.body;

    const admin = await Admin.findOne({email:email});
    if(!admin){
        return res.status(400).json("Admin not found")
    }
    if(admin.password == password){

        return res.status(200).json({message:"Login Successfully",admin:{
            email:admin.email,
            id:admin._id,
            role:"admin"
        }})
    }else{

        return res.json({message:"Password not matched"})
    }

})

router.put('/change/:id',async(req,res)=>{
    const {op , np , cnp} = req.body;
    const{id} = req.params;
    const user = await Admin.findById(req.params.id);
    if(!user){
        return res.json({message:"Deatils not matched"})
    }
    if(user.password==op){
        if(op==np){
            return res.json({message:"Your old and new password are same"})
        }else if(np==cnp){
            try{
const ex = await Admin.findByIdAndUpdate(id,{password:cnp});
                return res.json({message:"Password Updated successfully"});
            }catch(er){
                console.log(er)
                return res.json({message:"Sorry try again"})
            }
        }
    }else{
        return res.json({message:"Your Old Password not matched"})
    }
})

// http://localhost:5000/api/admin/login
module.exports = router