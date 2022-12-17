const contactsOperation = require("../../models/contacts");

const listContacts = async (req, res, next) => {
  const contacts = await contactsOperation.listContacts();

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      contacts: contacts,
    },
  });
};

module.exports = listContacts;
