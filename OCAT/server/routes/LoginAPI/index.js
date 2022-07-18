const router = require(`express`).Router();
const { UserService } = require(`../../libs`);

// WHAT IS THE DESTINATION??????????????????
router.post(`/login`, async (req, res, next) => {
  try {

    const result = await UserService.login(req.body);
    res
      .status(200)
      .json({ result });

    // call the submit function from the server/libs/AssessmentService
  } catch (error) {
    next(error);
  }
});

exports.router = router;
exports.path = `/api/users`;
