// const express = require("express");

// const { users: ctrl } = require("../../controllers");
// const { auth, ctrlWrapper } = require("../../middleware");

// const router = express.Router();

// router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

// module.exports = router;

const express = require("express");

const router = express.Router();

const { auth, ctrlWrapper } = require("../../middleware");

const { users: ctrl } = require("../../controllers");

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
