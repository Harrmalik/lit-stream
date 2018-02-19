'use strict';

module.exports.hello = (event, context, callback) => {
    request.get(`http://api.soundcloud.com/tracks?client_id=ac896ad5490da37d6c8064572d06d7bb&q=${req.query.query}&limit=50`, function(error, response, body) {
        if (body) {
            body = JSON.parse(body);
            res.json(body);
        }
    });
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
