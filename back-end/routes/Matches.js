const router = require("express").Router();
const Match = require("../models/Matches");

//new match
router.post("/", async (req, res) => {
  const newMatch = new Match({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedMatch = await newMatch.save();
    res.status(200).json(savedMatch);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get specific match of the user
router.get("/:userId", async (req, res) => {
  try {
    const Match = await Match.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(Match);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get match includes two userId
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const match = await Match.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(match)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;