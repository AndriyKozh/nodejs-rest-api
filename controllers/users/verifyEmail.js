const { Users } = require("../../models/users");
const { NotFound } = require("http-errors");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await Users.findOne({ verificationToken });
  if (!user) {
    throw NotFound;
  }
  await Users.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: false,
  });
  res.json({
    massage: "Verifi success",
  });
};

module.exports = verifyEmail;
