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
  await Assessments
    .where({ deleted_at: null })
    .orderBy(`id`, `ASC`)
    .fetchAll()
    .then((data) => data);

exports.delete = (ids) => {
  // soft delete assessments that match the ids.
  const now = new Date().toUTCString();
  console.log(`datteee`);
  console.log(now);

  const deleted = ids.Selected;
  for (const id of deleted) {
    Assessments.where({ id }).save({ deleted_at: now }, { patch: true }); }
};
