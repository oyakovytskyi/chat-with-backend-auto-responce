const express = require("express");
const router = express.Router();
const { postMessage } = require("../controllers/messageController");

router.post("/:id/messages", postMessage);

module.exports = router;
