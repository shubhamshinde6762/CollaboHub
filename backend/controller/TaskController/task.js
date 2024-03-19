const user = require("../../model/User/user");
const connectedUser = require("../../model/User/connectedUser");
const project = require("../../model/Project/project");
const task = require("../../model/Project/task");
const { getIO } = require("../../socket");

exports.createTask = async (req, res) => {
  try {
    const { taskName, projectId, owner, contributorsId, priority, dueDate } =
      req.body;

    const _id = owner;

    const existingUser = await user.findOne({ _id });
    if (!existingUser) {
      res.status(401).json({
        status: "401-USER",
      });
      return;
    }

    const existingProject = await project.findOne({ _id: projectId });

    if (!existingProject) {
      res.status(401).json({
        status: "401-PROJECT",
      });
      return;
    }

    const date = new Date();
    const createdOn = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    let newTask = await task.create({
      taskName,
      projectId,
      owner,
      contributorsId,
      priority,
      dueDate,
      createdOn,
    });

    const newContributorIds = existingProject.contributorsIds.map((ele) => {
      if (contributorsId.map((id) => id._id === ele._id)) {
        ele.contributingTask = [...ele.contributingTask, newTask["_id"]];
      }

      if (owner === ele._id) {
        ele.createdTask = [...ele.createdTask, newTask._id];
      }

      return ele;
    });

    await project.updateOne(
      { _id: projectId },
      {
        $addToSet: { taskIds: newTask["_id"] },
        $set: { contributorsIds: newContributorIds },
      }
    );

    contributorsId.forEach(async (element) => {
      await user.updateOne(
        { _id: element },
        {
          $push: { notification: newTask["_id"] },
        }
      );
    });

    // Send success response
    res.status(200).json({
      status: "Task created successfully",
      task: newTask,
    });
    contributorsId.forEach(async (element) => {
      const connectedUserList = await connectedUser.findOne({
        userId: element,
      });
      if (connectedUserList) {
        connectedUserList.socketIds.forEach((socketId) => {
          getIO().to(socketId).emit("addedTask", {
            project: existingProject,
            owner: existingUser,
            taskname: newTask.taskName,
            contributorsId: newTask.contributorsId,
          });
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      status: err.message || "BAD-REQUEST",
    });
  }
};

exports.editTask = async (req, res) => {
  try {
    const { email } = req.body;
    const { taskName, projectId, taskId, contributorsId, priority, dueDate } =
      req.body;

    const existingUser = await user.findOne({ email });

    if (!existingUser) {
      res.status(401).json({
        status: "401-USER",
      });
      return;
    }

    const existingProject = await project.findOne({ _id: projectId });

    if (!existingProject) {
      res.status(401).json({
        status: "401-PROJECT",
      });
      return;
    }

    const existingTask = await task.findOne({ _id: taskId });
    if(!existingTask){
      res.status(401).json({
        status : "401-TASK",
      })
      return;
    }
    const contributorsIdsArray = contributorsId.map(
      (contributor) => contributor._id
    );
    await task.updateOne(
      { _id: taskId },
      {
        $set: {
          taskName,
          contributorsId,
          priority,
          dueDate,
        },
      }
      );

      const newContributorIds = existingProject.contributorsIds.map((ele) => {
        if (
          contributorsIdsArray.includes(ele._id) &&
          !existingTask.contributorsId.some((id) => id._id === ele._id)
        ) {
          ele.contributingTask = [...ele.contributingTask, taskId];
        } else if (
          !contributorsIdsArray.includes(ele._id) &&
          existingTask.contributorsId.some((id) => id._id === ele._id)
        ) {
          ele.contributingTask = ele.contributingTask.filter(
            (id) => id !== taskId
          );
        }
      
        return ele;
    });
    await project.updateOne(
      { _id: projectId },
      {
        $set: { contributorsIds: newContributorIds },
      }
    );

    await Promise.all(
      contributorsId.map(async (element) => {
        await user.updateOne(
          { _id: element },
          {
            $push: { notification: taskId },
          }
        );
      })
    );
    await existingTask.save();
    await existingProject.save();
    // const userToNotify = new Set([contributorsIdsArray]);
    // console.log(123);
    // const active = await connectedUser.find({
    //   userId:{
    //     $in : Array.from(userToNotify),
    //   },
    // });
    
    // let socketsToNotify = [];
    
    // active.forEach((ele) => {
    //  (ele) => (socketsToNotify = [ele.socketIds, ...socketsToNotify])
    // });
    // socketsToNotify.forEach((ele) => {
    //   getIO.to(ele).emit("editedTask",{
    //     message : "Task updated successfully"
    //   });
    // });
    
    // Send success response
    res.status(200).json({  
      status: "Task updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: err.message || "BAD-REQUEST",
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { email } = req.body;
    const { projectId, taskId } = req.body;

    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      res.status(401).json({
        status: "401-USER",
      });
      return;
    }

    const existingProject = await project.findOne({ _id: projectId });

    if (!existingProject) {
      res.status(401).json({
        status: "401-PROJECT",
      });
      return;
    }

    const existingTask = await task.findOne({ _id: taskId });

    if (!existingTask) {
      return;
    }

    await task.deleteOne({ _id: taskId });

    const updateContributorsIds = (existingProject, taskId) => {
      const newContributorsIds = existingProject.contributorsIds.map(
        (contributor) => {
          if (
            contributor.contributingTask &&
            contributor.contributingTask.includes(taskId)
          ) {
            contributor.contributingTask = contributor.contributingTask.filter(
              (id) => id !== taskId
            );
          }
          if (
            contributor.createdTask &&
            contributor.createdTask.includes(taskId)
          ) {
            contributor.createdTask = contributor.createdTask.filter(
              (id) => id !== taskId
            );
          }
          return contributor;
        }
      );

      return newContributorsIds;
    };
    existingProject.contributorsIds = updateContributorsIds(
      existingProject,
      taskId
    );

    existingProject.taskIds = existingProject.taskIds.filter(
      (id) => id !== taskId
    );

    await existingProject.save();
    const contributorIds = existingTask.contributorsId.map(
      (contributor) => contributor._id
    );
    const userToNotify = new Set([
      ...contributorIds,
      ...existingProject.owners,
    ]);

    const active = await connectedUser.find({
      userId: {
        $in: Array.from(userToNotify),
      },
    });
    let socketsToNotify = [];
    active.forEach(
      (ele) => (socketsToNotify = [...ele.socketIds, ...socketsToNotify])
    );
    socketsToNotify.forEach((ele) => {
      getIO().to(ele).emit("deleteTask", {
        message: "task deleted successfully",
        user: existingUser,
        task: existingTask,
        project: existingProject,
        contributorIds: contributorIds,
      });
    });
    res.status(200).json({
      status: "Task deleted successfully",
      existingProject,
    });
  } catch (err) {
    res.status(400).json({
      status: err.message || "BAD-REQUEST",
    });
  }
};
