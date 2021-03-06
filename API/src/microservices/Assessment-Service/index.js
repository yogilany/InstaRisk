const { Assessments } = require(`../Database`);

exports.submit = (assess) => {

  Assessments.forge(assess)
    .save()
    .then(assessment => assessment)
    .catch(err => {
      console.log(err);
    });
  // use the bookshelf model Assessments from API/src/microservices/Database to save
  // the assessment data in the PostgreSQL database
};

exports.getList = async () =>
  // use the bookshelf model Assessments from API/src/microservices/Database to fetch
  // the assessment data from the PostgreSQL database
  await Assessments.fetchAll()
    .then((data) => data);
