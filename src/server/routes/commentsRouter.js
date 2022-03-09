const express = require("express");
const { listComments } = require("../controllers/commentControllers");

const router = express.Router();

router.get("/list", listComments);
