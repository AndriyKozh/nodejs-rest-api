const { Users } = require("../../models/users");
const bcrypt = require("bcryptjs");
const { Conflict } = require("http-errors");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  //   беремо з боді email
  const user = await Users.findOne({ email });

  //   Виводимо помилку, якщо вже є користувач з таким email
  if (user) {
    throw new Conflict(`User whith ${email} already exist`);
  }
  // Хешування коду та сіль
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  //   Створюємо нового користувача
  await Users.create({ name, email, password: hashPassword });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      name,
      email,
      password,
    },
  });
};
module.exports = register;
