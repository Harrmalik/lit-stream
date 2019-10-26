'use strict';

const request = require('request');
const slsGetAlbumUrl = 'https://bgmv70svsg.execute-api.us-east-1.amazonaws.com/prod/album-covers-dev-getAlbum';

module.exports.getCover = (event, context, callback) => {
    let params = event.queryStringParameters

    request.get(`${slsGetAlbumUrl}?track=${params.track}&artist=${params.artist}`, (error, response, body) => {
        let nowPlaying = {}
        if (body) {
            body = JSON.parse(body);
            console.log(body);
            if (body.image) {
                nowPlaying.image = body.image;
                nowPlaying.album = body.album;
            }

            callback(null, {
              statusCode: 200,
              body: JSON.stringify(nowPlaying),
            });
        } else {
            callback(null, {
              statusCode: 200,
              body: JSON.stringify(nowPlaying),
            });
        }
    });
};
