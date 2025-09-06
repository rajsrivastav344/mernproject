const Examinee = require('../models/Examinee')
const express = require('express');
const router = express.Router();

router.post('/',async(req,res)=>{
    const {email}= req.body
    const ex = Examinee.findOne({email:email})
    if(ex){
        return res.json({message:"Details already exist"})
    }
    
    const user = await new Examinee(req.body);
    user.save();
    return res.json("Registered Successfully")
})

router.get('/',async(req,res)=>{
    const user = await Examinee.find();
    return res.json(user)
})
router.put('/:id',async(req,res)=>{
    const {id} = req.params;
    const user = await Examinee.findByIdAndUpdate(id,req.body);
    return res.json("Updated Successfully")
})
router.delete('/:id',async(req,res)=>{
    const {id}= req.params
    const user = await Examinee.findByIdAndDelete(id);
    return res.json("Deleted Successfully")
});

router.get('/:id',async(req,res)=>{
    const {id} = req.params
    const user = await Examinee.findById(id)
    return res.json(user)
})

router.post('/login', async(req,res)=>{
    const {email, password} = req.body;

    const user = await Examinee.findOne({email:email});
    if(!user){
        return res.status(400).json("user not found")
    }
    if(user.password == password){

        return res.status(200).json({message:"Login Successfully",user:{
            email:user.email,
            id:user._id,
            role:"user"
        }})
    }else{

        return res.json({message:"Password not matched"})
    }

})

router.put('/change/:id',async(req,res)=>{
    const {op , np , cnp} = req.body;
    const{id} = req.params;
    const user = await Examinee.findById(req.params.id);
    if(!user){
        return res.json({message:"Deatils not matched"})
    }
    if(user.password==op){
        if(op==np){
            return res.json({message:"Your old and new password are same"})
        }else if(np==cnp){
            try{
const ex = await Examinee.findByIdAndUpdate(id,{password:cnp});
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
module.exports = router