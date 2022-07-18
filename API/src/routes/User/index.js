const { ResponseHandler } = require(`../../utils`);
const { UserService } = require(`../../microservices`);

const BASE_URL = `/user`;

module.exports = server => {
  server.post(
    `${BASE_URL}/login`,
    async (req, res, next) => {
      try {
        const { LoginData: { loginData } } = req.body;

        // verify that your data is making it here to the API by using console.log(assessment);
        // call the AssessmentService.submit function from the API/src/microservices/Assessment/ and
        // supply the correct parameters
        const result = await UserService.confirmCredentials(loginData);
        // generate token

        ResponseHandler(
          res,
          `Submitted data`,
          { result },
          next,
        );
      } catch (err) {
        next(err);
      }
    },
  );
};
