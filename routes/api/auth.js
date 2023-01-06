const express = require("express");
const { auth: ctrl } = require("../../controllers");
const { auth, ctrlWrapper, validation } = require("../../middleware");
const { registerJoiSchema, loginJoiSchema } = require("../../models/users");
const router = express.Router();

const regJoiSchema = validation(registerJoiSchema);
const logJoiSchema = validation(loginJoiSchema);

router.post("/register", regJoiSchema, ctrlWrapper(ctrl.register));
router.post("/login", logJoiSchema, ctrlWrapper(ctrl.login));
router.post("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
