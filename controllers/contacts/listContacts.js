const { Contact } = require("../../models/contacts");

const listContacts = async (req, res, next) => {
  const { _id } = req.user;
  console.log(req.query);
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      contacts: contacts,
    },
  });
};

module.exports = listContacts;
