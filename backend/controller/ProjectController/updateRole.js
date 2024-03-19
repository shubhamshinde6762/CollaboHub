const connectedUser = require("../../model/User/connectedUser");
const project = require("../../model/Project/project");
const { getIO } = require("../../socket");

exports.updateRole = async (req, res) => {
  try {
    // console.log(req.body);
    const { searchUserId, projectId, role, user, searchuser } = req.body;

    console.log(req.body.role)

    const existingProject = await project.findOne({ _id: projectId });
    console.log(existingProject);
    if (
      (role === "Member" && !existingProject.owners.includes(searchUserId)) ||
      (role === "Owner" && existingProject.owners.includes(searchUserId))
    ) {
      res.status(400).json({
        message: "Role Colloide",
      });
      return;
    }

    if (role === "Owner") existingProject.owners.push(searchUserId);
    else existingProject.owners = existingProject.owners.filter((ele) => ele !== searchUserId);
    await existingProject.save();

    const userToNotify = new Set([...existingProject.owners, searchUserId]);

    const active = await connectedUser.find({
      userId: {
        $in: Array.from(userToNotify),
      },
    });
    console.log(userToNotify);

    let socketsToNotify = [];
    active.forEach(
      (ele) => (socketsToNotify = [ele.socketIds, ...socketsToNotify])
    );
    socketsToNotify.forEach((ele) => {
      getIO().to(ele).emit("needToUpdateProject", {
        existingProject: existingProject,
        role: role,
        user: user,
        searchuser: searchuser,
      });
    });

    console.log({
      existingProject: existingProject,
      role: role,
      user: user,
      searchuser: searchuser,
    })

    res.status(200).json({
      message: "Owner added successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: "chukichi request",
    });
  }
};
