const { Contact } = require("../../models/contacts");

const addContact = async (req, res, next) => {
  const { _id } = req.user;
  const contact = await Contact.create({ ...req.body, owner: _id });

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};

module.exports = addContact;
