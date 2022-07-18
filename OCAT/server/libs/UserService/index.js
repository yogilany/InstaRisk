const { client, config } = require(`../../utils`);
const { InternalServerError } = require(`restify-errors`);

exports.login = (LoginData) => new Promise((resolve, reject) => {

  // this function sends a request to the API
  // finish the logic to handle the response when returned from the API
  client.post(`/user/login`, { LoginData },
    (err, req, res, body) => {
      if (err) {

        return reject(err);
      }

      if (res.statusCode !== 200) {

        return reject(new InternalServerError(`Request Error`));
      }

      resolve(body.data);
    });
});
