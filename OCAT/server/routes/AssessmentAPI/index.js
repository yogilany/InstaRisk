const router = require(`express`).Router();
const { AssessmentService } = require(`../../libs`);

router.post(`/submit`, async (req, res, next) => {
  try {

    const { assessment } = req.body;
    await AssessmentService.submit(assessment);

    // call the submit function from the server/libs/AssessmentService
  } catch (error) {
    next(error);
  }
});

router.get(`/list`, (req, res, next) => {
  try {
    // call the getList function from the server/libs/AssessmentService
    // return assessments to front-end
  } catch (error) {
    next(error);
  }
});

exports.router = router;
exports.path = `/api/assessment`;
