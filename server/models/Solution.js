const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    questionID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Question',
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
    

},{
    timestamps:true,
});
const Solution =  mongoose.model('Question',solutionSchema);

module.exports = Solution;