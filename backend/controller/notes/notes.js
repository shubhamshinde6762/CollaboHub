const notes = require("../../model/User/notes");
const user = require("../../model/User/user");

function getCurrentDateTimeString() {
  let currentDate = new Date();

  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();

  day = (day < 10 ? "0" : "") + day;
  month = (month < 10 ? "0" : "") + month;

  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  hours = (hours < 10 ? "0" : "") + hours;
  minutes = (minutes < 10 ? "0" : "") + minutes;

  let dateTimeString =
    day + "/" + month + "/" + year + " " + hours + ":" + minutes;

  return dateTimeString;
}

exports.FetchNote = async (req, res) => {
  try {
    const notesArray = req.body.notesArray;
    console.log(notesArray);
    const data = await notes.find({
      _id: {
        $in: notesArray,
      },
    });

    if (data) {
      res.status(200).json({
        data,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message || "BAD-REQUEST",
    });
  }
};

exports.EditNote = async (req, res) => {
  try {
    const { userId, title, description, _id } = req.body;
    const lastEdited = getCurrentDateTimeString();

    const currentNote = await notes.findOne({ _id });

    if (!currentNote) {
      return res.status(404).json({ error: "Note not found." });
    }

    const updatedNote = await notes.create({
      userId,
      title,
      description,
      lastEdited,
    });

    if (!updatedNote) {
      return res.status(500).json({ error: "Failed to update note." });
    }

    await user.updateOne(
      { _id: userId },
      {
        $pull: { notes: _id },
      }
    );

    await user.updateOne(
      { _id: userId },
      {
        $addToSet: { notes: updatedNote._id },
      }
    );

    res.status(200).json({
      updatedNote,
    });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.DeleteNote = async (req, res) => {
  try {
    const { _id } = req.body;

    await notes
      .deleteOne({
        _id,
      })
      .then((data) => {
        res.status(200).json({
          data,
        });
      });
  } catch (err) {
    res.status(400).json({
      message: err.message || "BAD-REQUEST",
    });
  }
};

exports.CreateNote = async (req, res) => {
  try {
    const { userId, title, description } = req.body;
    const lastEdited = getCurrentDateTimeString();
    console.log(999);

    const newNote = await notes.create({
      userId,
      title,
      description,
      lastEdited,
    });

    if (newNote) {
      await user.updateOne(
        { _id: userId },
        {
          $push: { notes: newNote["_id"] },
        }
      );

      res.status(200).json({
        newNote,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message || "BAD-REQUEST",
    });
  }
};
