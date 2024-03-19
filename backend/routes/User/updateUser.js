const express =  require("express");
console.log(123);
const router = express.Router();
const {updateUser} = require("../../controller/updateUser")
router.post("/updateUser",updateUser);

module.exports = router;