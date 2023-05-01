// retrieve info on a user account
const User = require("../models/user");
const router = require("express").Router();

router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const userName = req.query.userName;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ userName: userName });
      const { email, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;