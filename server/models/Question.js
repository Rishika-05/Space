const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    problem:{
        type:String,
        required:true
    },
    solution:{
        type:String,
        required:true
    }
},{
    timestamps:true,
});
const Question =  mongoose.model('Question',questionSchema);

module.exports = Question;