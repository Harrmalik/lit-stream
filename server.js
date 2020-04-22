const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3001;

app.get('/search/:query/:platform', async (req, res) => {
  try {
    let requestQuery;
    console.log(req.params);
    console.log(process.env.youtubeApikey)
    switch (req.params.platform) {
      case 'youtube': requestQuery = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${req.params.query}&maxResults=20&key=${process.env.youtubeApikey}`; break;
      case 'soundcloud': requestQuery = `http://api.soundcloud.com/tracks?client_id=${process.env.spotifyApiKey}&q=${req.params.query}&limit=50`; break;
      default:
    }

    console.log(requestQuery);
    await fetch(requestQuery)
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      res.json(myJson);
    })
  } catch (e) {
    res.json(500, e);
  }
})

app.get('/findAlbum/:artist/:track', async (req, res) => {
  try {
    await fetch(`https://axzodu785h.execute-api.us-east-1.amazonaws.com/dev?track=${req.params.track}&artist=${req.params.artist}`)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        res.json(myJson);
      })
  } catch (e) {
    res.json(500, e);
  }
})

app.get('/getPlaylist/:artist/:track', async (req, res) => {
  try {
    await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&playlistId=${req.params.query}&maxResults=20&key=${process.env.youtubeApikey}`)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        res.json(myJson);
      })
  } catch (e) {
    res.json(500, e);
  }
})

// app.get('/findAlbum/:artist/:track', async (req, res) => {
//   try {
//     await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${req.params.query}&maxResults=20&key=${process.env.youtubeApikey}`)
//       .then((response) => {
//         return response.json();
//       })
//       .then((myJson) => {
//         res.json(myJson);
//       })
//   } catch (e) {
//     res.json(500, e);
//   }
// })
//
// app.get('/findAlbum/:artist/:track', async (req, res) => {
//   try {
//     await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${req.params.query}&maxResults=20&key=${process.env.youtubeApikey}`)
//       .then((response) => {
//         return response.json();
//       })
//       .then((myJson) => {
//         res.json(myJson);
//       })
//   } catch (e) {
//     res.json(500, e);
//   }
// })


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
