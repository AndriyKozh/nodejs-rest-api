const { Users } = require("../../models/users");

const getCurrent = (req, res) => {
  const { name, email, password } = req.user;

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      user: {
        name,
        email,
      },
    },
  });
};

module.exports = getCurrent;
