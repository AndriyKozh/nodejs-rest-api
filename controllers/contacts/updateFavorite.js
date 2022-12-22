const { Contact } = require("../../models/contacts");
const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const contact = await Contact.findByIdAndUpdate(
    contactId,

    { favorite },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};

module.exports = updateFavorite;
