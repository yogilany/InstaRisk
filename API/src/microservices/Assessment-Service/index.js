
const { Assessments } = require(`../Database`);

exports.submit = async (assess) => {

  Assessments.forge(assess)
    .save()
    .then(assessment => {
      console.log(assessment);
    })
    .catsh(err => {
      console.log(err);
    });
  // use the bookshelf model Assessments from API/src/microservices/Database to save
  // the assessment data in the PostgreSQL database
};

exports.getList = () => {
  // use the bookshelf model Assessments from API/src/microservices/Database to fetch
  // the assessment data from the PostgreSQL database
  const assessments = [];

  return assessments;
};
