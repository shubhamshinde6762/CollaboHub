const chat = require("../../model/Chat/chat");
const user = require("../../model/User/user");
const project = require("../../model/Project/project");

exports.createProject = async (req, res) => {
  try {
    // console.log(req.body)
    const { projectName, email } = req.body;

    if (!projectName) {
      res.status(400).json({
        error: "400-EMPTY",
      });
      return;
    } else if (!email) {
      req.status(400).json({
        error: "400-USER",
      });
      return;
    }
    const admin = await user.findOne({ email });
    // console.log(admin["_id"])

    if (!admin) {
      req.status(400).json({
        error: "400-USER",
      });
      return;
    }

    const group = {
      chatName: projectName,
      admin: [admin["_id"]],
    };

    const chatProject = await chat.create({ type: "Project", group });

    const response = await project
      .create({
        projectName,
        owners: [admin["_id"]],
        contributorsIds: [{ _id: admin["_id"] }],
        chatId: chatProject._id,
      })
      .then(async (doc) => {
        const updatedUser = await user.updateOne(
          { email },
          {
            $set: {
              projectIds: [...admin.projectIds, doc._id],
            },
            $addToSet: {
              chatGroup: [chatProject._id],
            },
          }
        );

        console.log(doc);
        console.log(updatedUser);

        res.status(200).json({
          message: "success",
        });
      });

    // console.log(response)
  } catch (err) {
    res.status(500).json({
      message: "failed",
    });
  }
};



