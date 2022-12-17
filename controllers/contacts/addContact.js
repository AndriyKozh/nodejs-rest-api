const contactsOperation = require("../../models/contacts");

const addContact = async (req, res, next) => {
  const contact = await contactsOperation.addContact(req.body);

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};

module.exports = addContact;
