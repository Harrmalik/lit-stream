const express = require('express');
const router = express.Router();
const request = require('request');
const Youtube = require('youtube-api');
const _ = require('lodash');
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
                maxResults: 20,
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
    Youtube.playlistItems.list({
        part: "snippet",
        playlistId: req.query.query,
        maxResults: 50,
        nextPageToken: ""
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

router.get('/getChannel', function(req, res, next) {
    // TODO: make ayscronous
    Youtube.playlists.list({
        part: "snippet",
        channelId: req.query.query,
        maxResults: 50,
        nextPageToken: ""
    }, (err, playlist) => {
        if (err) {
            console.log(err);
        }

        Youtube.search.list({
            part: "snippet",
            channelId: req.query.query,
            maxResults: 50,
            order: 'date'
        }, (err, tracks) => {
            if (err) {
                console.log(err);
            }

            res.json({
                channel: playlist.items[0].snippet.channelTitle,
                playlists: playlist.items,
                tracks: _.map(tracks.items, function(result) {
                    return {
                        id: result.id[`${result.id.kind.split('#')[1]}Id`],
                        url: `https://www.youtube.com/watch?v=${result.id.videoId}`,
                        channelTitle: result.snippet.channelTitle,
                        title: result.snippet.title,
                        artist: result.snippet.title,
                        thumbnail: result.snippet.thumbnails.default.url,
                        type: result.id.kind.split('#')[1],
                        platform: 'youtube',
                    }
                })
            });
        });
    });
});

router.get('/getChannelTracks', function(req, res, next) {
    Youtube.search.list({
        part: "snippet",
        channelId: req.query.query,
        maxResults: 50,
        order: 'date'
    }, (err, data) => {
        if (err) {
            console.log(err);
        }

        res.json(data.items);
    });
});

router.get('/getChannelPlaylists', function(req, res, next) {
    Youtube.playlists.list({
        part: "snippet",
        channelId: req.query.query,
        maxResults: 50,
        nextPageToken: ""
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
