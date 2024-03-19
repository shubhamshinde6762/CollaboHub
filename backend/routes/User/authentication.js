const express = require("express");
const router = express.Router();

const { auth } = require("../../middleware/auth");
const { fetchUser } = require("../../controller/fetchUser");
const { logIn, signIn, autoLogin } = require("../../controller/log");

router.post("/fetchUser", fetchUser);
router.post("/login", logIn);
router.get("/login", auth, autoLogin);
router.post("/signUp", signIn);

module.exports = router;
