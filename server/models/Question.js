const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    problem:{
        
            problemStatement:{
                type:String,
                required:true
            },
            sampleInput:{
                type:String,
                required:false
            },
            sampleOutput:{
                type:String,
                required:true
            }
    },
    answer:{
        type:String,
        required:true
    },
    testCase:{
        type:String,
        required:false
    },
    difficulty:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        required:true
    }

},{
    timestamps:true,
});
const Question =  mongoose.model('Question',questionSchema);

module.exports = Question;