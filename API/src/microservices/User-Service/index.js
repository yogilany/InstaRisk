const { Users } = require(`../Database`);
const bcrypt = require(`bcrypt`);
const saltRounds = 10;

const encryptPassword = (password) => bcrypt.hash(password, saltRounds);

const getUserByUsername = async (username) => await Users
  .where({ username })
  .fetch({ require: false })
  .then(data => data);

const encpass = `$2b$10$9FUUwcHFXR1hEEZuII8NC.VF0xDq0nH/Z9NLAM2G7CC4wsZSw.4PC`;

exports.confirmCredentials = async ({ password, username }) => {
  try {
    const user = await getUserByUsername(username);

    if (user) {
      if (await bcrypt.compare(password, encpass) === true)
      {
        return `password is right`;
      }
      return `password is wrong`;
    }
    return `no user found`;

  } catch (error) {
    console.log(error);
  }
};
