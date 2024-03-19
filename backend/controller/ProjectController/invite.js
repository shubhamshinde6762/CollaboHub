const chat = require("../../model/Chat/chat");
const user = require("../../model/User/user");
const connectedUser = require("../../model/User/connectedUser");
const project = require("../../model/Project/project");

const { getIO } = require("../../socket");

exports.invite = async (req, res) => {
  try {
    const { email, projectId } = req.body;

    // Check if the user with the given email exists
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        status: "401-USER",
        message: "User not found",
      });
    }

    if (
      existingUser.projectIds.includes(projectId) ||
      existingUser.invitedProjectIds.includes(projectId)
    ) {
      return res.status(401).json({
        status: "ALREADY",
        message:
          "User already in the project or has already received an invitation",
      });
    }

    // Check if the project with the given projectId exists
    const existingProject = await project.findOne({ _id: projectId });
    if (!existingProject) {
      return res.status(401).json({
        status: "401-PROJECT",
        message: "Project not found",
      });
    }

    // Update project document
    await project.updateOne(
      { _id: projectId },
      {
        $addToSet: { invitedIds: existingUser["_id"] },
      }
    );

    // Update user document
    await user.updateOne(
      { email },
      {
        $addToSet: { invitedProjectIds: projectId },
      }
    );

    res.status(200).json({
      status: "Invitation sent successfully",
    });
    const connectedUserList = await connectedUser.findOne({
      userId: existingUser._id,
    });
    if (connectedUserList) {
      connectedUserList.socketIds.forEach((socketId) => {
        getIO()
          .to(socketId)
          .emit(
            "message",
            `New Request to work in ${existingProject.projectName}!`
          );
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: err.message || "Bad Request",
    });
  }
};

exports.acceptInvite = async (req, res) => {
  try {
    const { email, projectId } = req.body;

    // Check if the user with the given email exists
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        status: "401-USER",
        message: "User not found",
      });
    }

    // Check if the project with the given projectId exists
    const existingProject = await project.findOne({ _id: projectId });
    if (!existingProject) {
      return res.status(401).json({
        status: "401-PROJECT",
        message: "Project not found",
      });
    }

    const projectGroup = await chat.updateOne(
      { _id: existingProject.chatId },
      {
        $addToSet: {
          "group.groupMembers": existingUser["_id"],
        },
      }
    );

    const newInvite = existingUser.invitedProjectIds.filter(
      (ele) => ele !== projectId
    );

    const newInviteInProject = existingProject.invitedIds.filter(
      (ele) => ele !== existingUser["_id"]
    );

    // Update project document
    await project.updateOne(
      { _id: projectId },
      {
        $push: {
          contributorsIds: {
            _id: existingUser["_id"],
            contributingTask: [], // Initialize contributingTask as an empty array
            createdTask: [], // Initialize createdTask as an empty array
          },
        },
        $set: { invitedIds: newInviteInProject },
      }
    );

    // console.log(123)

    // Update user document
    await user.updateOne(
      { email },
      {
        $addToSet: {
          projectIds: projectId,
          chatGroup: [existingProject.chatId],
        },
        $set: { invitedProjectIds: newInvite },
      }
    );

    res.status(200).json({
      status: "Invite accepted successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: err.message || "Bad Request",
    });
  }
};

exports.rejectInvite = async (req, res) => {
  try {
    const { email, projectId } = req.body;

    // Check if the user with the given email exists
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        status: "401-USER",
        message: "User not found",
      });
    }

    // Check if the project with the given projectId exists
    const existingProject = await project.findOne({ _id: projectId });
    if (!existingProject) {
      return res.status(401).json({
        status: "401-PROJECT",
        message: "Project not found",
      });
    }

    const newInvite = existingUser.invitedProjectIds.filter(
      (ele) => ele !== projectId
    );

    const newInviteInProject = existingProject.invitedIds.filter(
      (ele) => ele !== existingUser["_id"]
    );

    // Update project document
    await project.updateOne(
      { _id: projectId },
      {
        $set: { invitedIds: newInviteInProject },
      }
    );

    // Update user document
    await user.updateOne(
      { email },
      {
        $set: {
          invitedProjectIds: newInvite,
        },
      }
    );

    res.status(200).json({
      status: "Invite rejected successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: err.message || "Bad Request",
    });
  }
};
