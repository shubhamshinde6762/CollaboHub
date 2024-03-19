const express = require("express");

const {invite, acceptInvite, rejectInvite} = require("./../../controller/ProjectController/invite")

const router = express.Router();

router.post("/invite",   invite);
router.post("/acceptInvite",  acceptInvite);
router.post("/rejectInvite",  rejectInvite);


module.exports = router;