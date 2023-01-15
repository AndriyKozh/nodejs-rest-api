const express = require("express");

const router = express.Router();

const { auth, ctrlWrapper, upload } = require("../../middleware");

const { users: ctrl } = require("../../controllers");

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvater)
);

//  добавляємо шлях /avatar з всіма мідлварами

module.exports = router;
