const { AssessmentService } = require(`../../microservices`);
const { ResponseHandler } = require(`../../utils`);

const BASE_URL = `/assessment`;

module.exports = server => {

  server.post(
    `${BASE_URL}/submit`,
    async (req, res, next) => {
      try {
        const { assessment } = req.params;

        // verify that your data is making it here to the API by using console.log(assessment);
        // call the AssessmentService.submit function from the API/src/microservices/Assessment/ and
        // supply the correct parameters
        await AssessmentService.submit(assessment);

        ResponseHandler(
          res,
          `Submitted assessment`,
          {},
          next,
        );
      } catch (err) {
        next(err);
      }
    },
  );

  server.get(
    `${BASE_URL}/list`,
    async (req, res, next) => {
      try {

        // verify that your data is making it here to the API by using console.log();
        // call the AssessmentService.getList function from the API/src/microservices/Assessment/
        const assessments = await AssessmentService.getList();

        ResponseHandler(
          res,
          `Fetched assessments`,
          { assessments },
          next,
        );

      } catch (err) {
        next(err);
      }
    },
  );

  server.post(
    `${BASE_URL}/delete`,
    async (req, res, next) => {
      try {
        const { ids } = req.body;

        const status = await AssessmentService.delete(ids);

        ResponseHandler(
          res,
          `Deleted assessments`,
          { status },
          next,
        );
      } catch (err) {
        next(err);
      }
    },
  );
};
