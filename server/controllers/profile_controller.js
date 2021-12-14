const User = require('../models/User');

module.exports.getProfile = async (req,res)=>{
    try{
        
        let user = await User.findById(req.params.id)
        .populate(
            {
                path:'questionsSolved',
                
            }
        )

        res.send({user:user});
    }catch(err){
        console.log(err.message);
        res.status(500).send("Interal Server Error");
    }
}