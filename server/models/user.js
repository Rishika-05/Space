const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    name:{
        type:String,
        required:true,
    },
    questionsSolved:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Question',
        }
    ],
    calender:[
        {
            day:{
                type:Number,
                required:true,
            },
            value:{
                type:Number,
                required:true,
                default:0,
            }
        }
    ]
},{
    timestamps:true,
});
const User =  mongoose.model('User',userSchema);

module.exports = User;