const express = require('express');
const Session = require('../models/Session');
const router = express.Router();

router.post('/', async(req, res)=>{
    const result = await new Session(req.body);
    result.save();
    return res.json({message:"Session Added Successfully"});
})

router.get('/', async(req,res)=>{
    const result = await Session.find();
    return res.json(result)
});
router.delete('/:id',async(req,res)=>{
    const result = await Session.findByIdAndDelete(req.params.id);
    return res.json({message:"Session Deleted Successfully"})
});
router.put('/:id', async(req,res)=>{
    const result = await Session.findByIdAndUpdate(req.params.id,req.body)
    return res.json({message:"Session Updated"})
})

module.exports = router