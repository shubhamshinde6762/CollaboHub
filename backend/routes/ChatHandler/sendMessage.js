const express = require("express");
const router = express.Router();
const {sendMessage} = require("../../controller/ChatController/sendMessage")
const {uploadMedia} = require("../../controller/ChatController/uploadMedia")

router.post("/sendMessage", sendMessage);
router.post("/uploadMedia",   uploadMedia);


module.exports = router;