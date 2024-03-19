const user = require("../../model/User/user");
const connectedUser = require("../../model/User/connectedUser");
const project = require("../../model/Project/project");
const task = require("../../model/Project/task");
const {getIO} = require("../../socket")

exports.completeTask = async(req, res) => {
  try{
    const {_id, currentUserId} = req.body;
    
    const taskToUpdate = await task.findOne({_id});
    const taskProject = await project.findOne({_id:taskToUpdate.projectId});
    const currentuser = await user.findOne({_id:currentUserId});

    taskToUpdate.contributorsId.map(ele => {
        if (ele._id === currentUserId)
        {
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
          const day = ('0' + currentDate.getDate()).slice(-2);
          const hours = ('0' + currentDate.getHours()).slice(-2);
          const minutes = ('0' + currentDate.getMinutes()).slice(-2);
          
          const formattedDate = year + '-' + month + '-' + day + ' ' + hours + '.' + minutes;
          
          ele.completedOn = formattedDate;
          if (new Date(taskToUpdate.dueDate) < new Date().setHours(0,0,0,0))
          ele.comments = "Delayed"
      }
    });
    
    await taskToUpdate.save();
    const userToNotify =new Set([taskToUpdate.owner,currentUserId]);
    const active = await connectedUser.find({
      userId:{
        $in: Array.from(userToNotify)
      }
    })
    let socketsToNotify = []
    active.forEach(ele => socketsToNotify = [ele.socketIds,...socketsToNotify]);
    socketsToNotify.forEach(ele =>{
      getIO().to(ele).emit("completedtask",{
        taskToUpdate : taskToUpdate,
        currentUserId : currentUserId,
        taskId : _id,
        projectName :taskProject.projectName,
        currentuser : currentuser
      })
    })
    console.log(socketsToNotify); 
    res.status(200).json({
        status:"Task Submitted"
    })
  }
  catch(err)
  {
    res.status(400).json({
        error: err.message || "BAD-REQUEST"
    })
  }
}

