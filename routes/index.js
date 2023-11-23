var express = require('express');
var router = express.Router();
const Tweet = require("../models/tweets");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/tweet", (req, res) => {
  if (!checkBody(req.body, ["content"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  const newTweet = new Tweet({
    content: req.body.content,
  });

  newTweet.save().then(() => {
    res.json({ result: true });
  });
});

router.post("/like", (req, res) => {
  Tweet.updateOne({})
});

module.exports = router;
