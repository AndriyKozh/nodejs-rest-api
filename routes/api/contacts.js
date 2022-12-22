const express = require("express");

const { validation, ctrlWrapper } = require("../../middleware");
const { joiSchema, favoriteJoiSchem } = require("../../models/contacts");
const { contacts: ctrl } = require("../../controllers");

const validateMiddleware = validation(joiSchema);
const validateFavoriteJoiSchem = validation(favoriteJoiSchem);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.updateContact));

router.patch(
  "/:contactId/favorite",
  validateFavoriteJoiSchem,
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
