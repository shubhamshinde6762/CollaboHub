const {fetchChat} = require("../../controller/ChatController/fetchChat")
const {fetchMessages} = require("../../controller/ChatController/fetchMessage")
const {createGroup} = require("../../controller/ChatController/createGroup")


const express = require("express");
const router = express.Router();

router.post("/fetchMessages", fetchMessages);
router.post("/fetchChat", fetchChat);
router.post("/createGroup", createGroup);

module.exports = router;