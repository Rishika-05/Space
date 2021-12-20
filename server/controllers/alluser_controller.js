const User = require('../models/User');

module.exports.leaderboard = async (req, res) => {
   try {
      const users = await User.find({}) ;
      res.send({ users: users});
   } catch (err) {
      console.log(err.message);
      res.status(500).send("Interal Server Error");
   }
}