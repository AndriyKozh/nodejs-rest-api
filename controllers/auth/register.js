const { Users } = require("../../models/users");
const bcrypt = require("bcryptjs");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { sendGridEmail } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  //   беремо з боді email
  const user = await Users.findOne({ email });

  //   Виводимо помилку, якщо вже є користувач з таким email
  if (user) {
    throw new Conflict(`User with email: ${email} already exist`);
  }
  const verificationToken = uuidv4();
  // Хешування коду та сіль
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  n;
  // створюємо gravatar
  const avatarURL = gravatar.url(email);

  //   Створюємо нового користувача
  await Users.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a target="_blank" href:="http://localhost:3000/api/users/verify/${verificationToken}">Confirm email</a>`,
  };

  await sendGridEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      name,
      email,
      avatarURL,
      verificationToken,
    },
  });
};
module.exports = register;
