const express = require("express");
const multer = require("multer");
const { userLogin, userRegister } = require("../controllers/userController");

const upload = multer({ dest: "public/" });
const router = express.Router();

router.post("/login", userLogin);
router.post(
  "/register",
  upload.single("image"),

  userRegister
);

module.exports = router;
