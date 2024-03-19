const chat = require("../../model/Chat/chat");
const user = require("../../model/User/user");
const connectedUser = require("../../model/User/connectedUser");
const project = require("../../model/Project/project");
const task = require("../../model/Project/task");

const {getIO} = require("../../socket");


exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.body;

    const existingProject = await project.findOne({ _id: projectId });

    await project.deleteOne({ _id: projectId });

    if (!existingProject) {
      res.status(400).json({
        status: "400-PROJECT",
      });
      return;
    }

    await chat.deleteOne({ _id: existingProject.chatId });

    const result = await task.deleteMany({
      _id: { $in: existingProject.taskIds },
    });

    existingProject.contributorsIds.map(async (ele) => {
      await user.updateOne(
        { _id: ele._id },
        {
          $pull: {
            projectIds: projectId,
            chatGroup: existingProject["chatId"]
          },
        }
      );
    });

    existingProject.invitedIds.map(async (ele) => {
        await user.updateOne(
          { projectIds: ele },
          {
            $pull: {
              projectIds: projectId,
            },
          }
        );
      });

    res.status(200).json({
        status:"Project Deleted Successfully"
    })

    existingProject.contributorsIds.map(async (ele) => {
      const connectedUserList = await connectedUser.findOne({ userId: ele._id });
      if (connectedUserList) {
        connectedUserList.socketIds.forEach((socketId) => {
          getIO().to(socketId).emit("message", `${existingProject.projectName} Deleted !`);
        });
      }
    });

    

  } catch (err) {
    res.status(400).json({
        status:err.message || "BAD-REQUEST"
    })
  }
};
