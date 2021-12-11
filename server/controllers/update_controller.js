const User = require('../models/User');

module.exports.updateSummary = async (req,res)=>{
    try{
        
        let user = await User.findById(req.params.id);
        let updateData = req.body;
        if(updateData.name && updateData.name != ''){
            user.name = updateData.name
        }
        if(updateData.email && updateData.email != ''){
            user.email = updateData.email
        }
        if(updateData.country && updateData.country != ''){
            user.country = updateData.country
        }
        user.save();
        
        
    }catch(err){
        console.log(err.message);
        res.status(500).send("Interal Server Error");
    }
}
module.exports.updateAbout = async (req,res)=>{
    try{
        
        let user = await User.findById(req.params.id);
        let updateData = req.body;
        console.log(updateData);
        if(updateData.about && updateData.about != ''){
            user.about = updateData.about
        }
        if(updateData.institute  && updateData.institute != ''){
            user.institute = updateData.institute
        }
        if(updateData.degree && updateData.degree != ''){
            user.degree = updateData.degree
        }
        if(updateData.graduation && updateData.graduation != ''){
            user.graduation = updateData.graduation
        }
        console.log(user);
        user.save();
        
        
    }catch(err){
        console.log(err.message);
        res.status(500).send("Interal Server Error");
    }
}