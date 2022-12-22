const { Contact } = require("../../models/contacts");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};

module.exports = updateContact;
