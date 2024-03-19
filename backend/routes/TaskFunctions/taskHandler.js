const express = require("express");

const {fetchTasks} = require("../../controller/TaskController/fetchTask")
const {createTask, editTask, deleteTask} = require("../../controller/TaskController/task")
const {completeTask} = require("../../controller/TaskController/updateTask")
const router = express.Router();

router.post("/fetchTask", fetchTasks);
router.post("/createTask",   createTask);
router.post("/editTask",  editTask);
router.post("/deleteTask",  deleteTask);
router.post("/completeTask",  completeTask);

module.exports = router;