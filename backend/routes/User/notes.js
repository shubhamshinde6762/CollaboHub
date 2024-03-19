const express = require("express");
const router = express.Router();

const {
  CreateNote,
  EditNote,
  DeleteNote,
  FetchNote
} = require("../../controller/notes/notes");

router.post("/createnote", CreateNote);
router.post("/editnote", EditNote);
router.post("/deletenote", DeleteNote);
router.post("/fetchnote", FetchNote);


module.exports = router;
