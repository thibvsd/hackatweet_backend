var express = require('express');
var router = express.Router();
const Tweet = require("../models/tweets");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/tweet", (req, res) => {
  if (
    req.body.content === "" ||
    !req.body.content
  )
  return res.json({ result: false, error: "Missing or empty fields" });

  const newTweet = new Tweet({
    content: req.body.content,
    likes: [],
  });

  newTweet.save().then(() => {
    res.json({ result: true });
  });
});

router.get("/tweet", (req, res) => {
  Tweet.find().then(data => {
    const contentTweet = data.map(tweet => tweet.content);
    res.json({ result: true, content: contentTweet });
  });
});


router.get("/alltweet", (req, res) => {
  Tweet.find().then(data => {
    const contentTweet = data.map(tweet => tweet);
    res.json({ result: true, content: contentTweet });
  });
});

router.post("/like/:idUser/:idTweet", (req, res) => {
  Tweet.updateOne({_id: req.params.idTweet},
    {$addToSet: {like: req.params.idUser}}
    )
});

module.exports = router;
