const contactsOperation = require("../../models/contacts");

const { NotFound } = require("http-errors");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsOperation.removeContact(contactId);
  console.log(contact);
  if (!contact) {
    throw new NotFound(`Contacts whit id=${contactId} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    message: "product deleted",
    data: {
      contact,
    },
  });
};

module.exports = removeContact;
