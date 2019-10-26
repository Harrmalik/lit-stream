'use strict';

const Youtube = require('youtube-api');
const _ = require('lodash');
const ytApiKey = process.env.youtubeApiKey;

Youtube.authenticate({
    type: "key"
  , key: ytApiKey
});

module.exports.findSong = (event, context, callback) => {
    let params = event.queryStringParameters

    Youtube.search.list({
        part: "snippet",
        q: params.query,
        maxResults: 20,
    }, (err, data) => {
        if (err) {
            callback(err, {
              statusCode: 500,
              body: JSON.stringify({
                message: err
              }),
            });
        }

        callback(null, {
          statusCode: 200,
          headers: { "Access-Control-Allow-Origin" : "*" },
          body: JSON.stringify(data.items)
        });
    });
};

module.exports.getPlaylist = (event, context, callback) => {
    let params = event.queryStringParameters

    Youtube.playlistItems.list({
        part: "snippet",
        playlistId: params.query,
        maxResults: 50,
        nextPageToken: ""
    }, (err, data) => {
        if (err) {
            callback(err, {
              statusCode: 500,
              body: JSON.stringify({
                message: err
              }),
            });
        }

        callback(null, {
          statusCode: 200,
          body: JSON.stringify(data.items),
        });
    });
};

module.exports.getChannel = (event, context, callback) => {
    let params = event.queryStringParameters

    Youtube.playlists.list({
        part: "snippet",
        channelId: params.query,
        maxResults: 50,
        nextPageToken: ""
    }, (err, playlist) => {
        if (err) {
            callback(err, {
              statusCode: 500,
              body: JSON.stringify({
                message: err
              }),
            });
        }

        Youtube.search.list({
            part: "snippet",
            channelId: params.query,
            maxResults: 50,
            order: 'date'
        }, (err, tracks) => {
            if (err) {
                callback(err, {
                  statusCode: 500,
                  body: JSON.stringify({
                    message: err
                  }),
                });
            }

            callback(null, {
              statusCode: 200,
              body: JSON.stringify({
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
              }),
            });
        });
    });
};

module.exports.getRelated = (event, context, callback) => {
    let params = event.queryStringParameters

    Youtube.search.list({
        part: "snippet",
        relatedToVideoId: params.query,
        maxResults: 20,
        type: 'video'
    }, (err, data) => {
        if (err) {
            callback(err, {
              statusCode: 500,
              body: JSON.stringify({
                message: err
              }),
            });
        }

        callback(null, {
          statusCode: 200,
          body: JSON.stringify(data.items),
        });
    });
};
