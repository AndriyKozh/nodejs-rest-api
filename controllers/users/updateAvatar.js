const { Users } = require("../../models/users");

const path = require("path");
const fs = require("fs/promises");

const avatarDir = path.join(__dirname, "../../", "pablic", "avatars");

const updateAvater = async (req, res) => {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;
  const imageName = `${_id}_${originalname}`;

  try {
    const resultUpdate = path.join(avatarDir, imageName);

    await fs.rename(tempUpload, resultUpdate);

    const avatarURL = path.join("pablic", "avatars", imageName);

    await Users.findByIdAndUpdate(req.user._id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvater;
