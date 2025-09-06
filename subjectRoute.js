const express = require('express');
const Subject = require('../models/Subject');
const router = express.Router();

router.post('/', async(req, res)=>{
    const result = await new Subject(req.body);
    result.save();
    return res.json({message:"Subject Added Successfully"});
})

router.get('/', async(req,res)=>{
    const result = await Subject.find();
    return res.json(result)
});
router.delete('/:id',async(req,res)=>{
    const result = await Subject.findByIdAndDelete(req.params.id);
    return res.json({message:"Subject Deleted Successfully"})
});
router.put('/:id', async(req,res)=>{
    const result = await Subject.findByIdAndUpdate(req.params.id,req.body)
    return res.json({message:"Subject Updated"})
})

module.exports = router