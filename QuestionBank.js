const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question:{
        type:String,
       
    },
    optionA:{
       type:String,
      
    },
    optionB:{
        type:String,
        
    },
    optionC:{
        type:String,
        
    },
   optionD:{
        type:String,
        
    },
    correctAnswer:{
        type:String,
        
    },
    subject:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subject',
        required:true
    },
   
},
{
    timestamps:true
}
)

module.exports = mongoose.model('Question',questionSchema);