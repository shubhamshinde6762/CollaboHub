const express = require("express");

const {createProject} = require("./../../controller/ProjectController/createProject")
const {deleteProject} = require("./../../controller/ProjectController/deleteProject")
const {updateRole} = require("./../../controller/ProjectController/updateRole")

const router = express.Router();

router.post("/createProject",  createProject);
router.post("/deleteProject",  deleteProject);
router.post("/updateRole",updateRole);

module.exports = router;