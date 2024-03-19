const {fetchChat} = require("../../controller/ChatController/fetchChat")
const {fetchMessages} = require("../../controller/ChatController/fetchMessage")


const express = require("express");
const router = express.Router();

router.post("/fetchMessages", fetchMessages);
router.post("/fetchChat", fetchChat);

module.exports = router;