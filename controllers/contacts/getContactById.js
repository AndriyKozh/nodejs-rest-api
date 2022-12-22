const createError = require("http-errors");
const { Contact } = require("../../models/contacts");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw createError(404, `Contacts whit id=${contactId} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};

module.exports = getContactById;
