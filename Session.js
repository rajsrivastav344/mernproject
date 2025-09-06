const mongoose = require('mongoose');
const sessionsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
module.exports = mongoose.model('Session',sessionsSchema)