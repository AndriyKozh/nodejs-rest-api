const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middleware");
const { joiSchema, favoriteJoiSchem } = require("../../models/contacts");
const { contacts: ctrl } = require("../../controllers");

const validateMiddleware = validation(joiSchema);
const validateFavoriteJoiSchem = validation(favoriteJoiSchem);

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", auth, validateMiddleware, ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.updateContact));

router.patch(
  "/:contactId/favorite",
  validateFavoriteJoiSchem,
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
