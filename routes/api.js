const express = require('express');
const router = express.Router();
const request = require('request');
const Youtube = require('youtube-api');
const ytApiKey = process.env.youtubeApiKey;
const slsGetAlbumUrl = 'https://bgmv70svsg.execute-api.us-east-1.amazonaws.com/prod/album-covers-dev-getAlbum';

Youtube.authenticate({
    type: "key"
  , key: ytApiKey
});

router.get('/findSong', function(req, res, next) {
    switch (req.query.platform) {
        case 'youtube':
            Youtube.search.list({
                part: "snippet",
                q: req.query.query,
                maxResults: 20
            }, (err, data) => {
                if (err) {
                    console.log(err);
                }

                res.json(data.items);
            });
            break;
        case 'soundcloud':
            request.get(`http://api.soundcloud.com/tracks?client_id=ac896ad5490da37d6c8064572d06d7bb&q=${req.query.query}&limit=50`, function(error, response, body) {
                if (body) {
                    body = JSON.parse(body);
                    res.json(body);
                }
            });
            break;
        default:

    }

});

router.get('/getPlaylist', function(req, res, next) {
    console.log(req.query.query)
    console.log('called');
    Youtube.playlistItems.list({
        part: "snippet",
        playlistId: req.query.query,
        maxResults: 20
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

router.get('/getRelated', function(req, res, next) {
    console.log(req.query.query)
    console.log('called');
    Youtube.search.list({
        part: "snippet",
        relatedToVideoId: req.query.query,
        maxResults: 20,
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

router.get('/getCover', (req, res, next) => {
    request.get(`${slsGetAlbumUrl}?track=${req.query.track}&artist=${req.query.artist}`, function(error, response, body) {
        let nowPlaying = {}
        if (body) {
            body = JSON.parse(body);
            console.log(body);
            if (body.image) {
                nowPlaying.image = body.image;
                nowPlaying.album = body.album;
            }
            res.send(nowPlaying);
        } else {
            res.send(nowPlaying);
        }
    });
})

module.exports = router;
