var express = require('express');
var router = express.Router();
const request = require('request');
const Youtube = require('youtube-api');
const ytApiKey = process.env.youtubeApiKey;

Youtube.authenticate({
    type: "key"
  , key: ytApiKey
});

router.get('/findSong', function(req, res, next) {
    Youtube.search.list({
        part: "snippet",
        q: req.query.query,
        maxResults: 50,
        type: 'video'
    }, (err, data) => {
        if (err) {
            console.log(err);
        }

        res.json(data.items);
    });
});

router.get('/getRelated', function(req, res, next) {
    Youtube.search.list({
        part: "snippet",
        relatedToVideoId: req.query.query,
        maxResults: 50,
        type: 'video'
    }, (err, data) => {
        if (err) {
            console.log(err);
        }
        if (data) {
            res.json(data.items);
        } else {
            res.json({});
        }
    });
});

module.exports = router;
