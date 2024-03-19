const express = require("express");

const {fetchProject, invitedProject, fetch} = require("./../../controller/ProjectController/fetchProjects")

const router = express.Router();

router.post("/getProjects", fetch);
router.post("/getInvitedProjects",  invitedProject);
router.post("/fetchProject",  fetchProject);

module.exports = router;