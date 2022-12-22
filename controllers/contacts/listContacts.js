const { Contact } = require("../../models/contacts");

const listContacts = async (req, res, next) => {
  const contacts = await Contact.find({});

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      contacts: contacts,
    },
  });
};

module.exports = listContacts;
