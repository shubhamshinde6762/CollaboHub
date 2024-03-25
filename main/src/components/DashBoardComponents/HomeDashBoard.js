import axios from "axios";
import React, { useState, useEffect } from "react";
import NotesHomePage from "./HomeComponents/Notes/NotesHomePage";
import UserPanel from "./HomeComponents/userPanel/UserPanel";
import ProjectList from "./HomeComponents/ProjectListComponents/ProjectList";
import BusyChart from "./HomeComponents/BusyChart";

const HomeDashBoard = ({ user, isUpdate }) => {
  const [projectDetails, setProjectDetails] = useState([]);
  const [projectIdArray, setProjectIdArray] = useState([]);
  const [taskIdArray, setTaskIdArray] = useState([]);
  const [taskDetails, setTaskDetails] = useState([]);
  let [sortedTasks, setSortedTasks] = useState([]);
  const [allDetails, setAllDetails] = useState([]);
  const [busyArray, setBusyArray] = useState(Array(7).fill(0));

  const currentTimeStamp = new Date();
  currentTimeStamp.setHours(0);
  currentTimeStamp.setMinutes(0);
  currentTimeStamp.setSeconds(0);
  currentTimeStamp.setMilliseconds(0);

  useEffect(() => {
    try {
      if (user && user.data && user.data.projectIds) {
        setProjectIdArray(user.data.projectIds);
      }
    } catch (err) {}
  }, [user]);

  useEffect(() => {
    const fetch = async () => {
      try {
        let response = await axios.post(
          "http://13.236.1.19:5000/api/v1/fetchTask",
          {
            tasks: taskIdArray,
          }
        );
        console.log("response", response);
        if (response && response.data && response.data.data) {
          response.data.data.map((task) => {
            task.contributorsId.map((contributor) => {
              if (contributor._id === user.data._id)
                if (contributor.completedOn !== null) task.completed = true;
                else task.completed = false;
            });
          });
          setTaskDetails(response.data.data);
        }
      } catch (err) {
        console.log("Error occured");
      }
    };

    fetch();
  }, [taskIdArray, isUpdate]);

  useEffect(() => {
    try {
      if (projectDetails && projectDetails.length > 0) {
        const newTaskIdArray = [];
        projectDetails.forEach((project) => {
          if (project.contributorsIds && project.contributorsIds.length > 0) {
            project.contributorsIds.forEach((contributor) => {
              if (contributor._id === user.data._id) {
                newTaskIdArray.push(...contributor.contributingTask);
              }
            });
          }
        });
        setTaskIdArray(newTaskIdArray);
      }
    } catch (err) {}
  }, [projectDetails]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response1 = await axios.post(
          "http://13.236.1.19:5000/api/v1/fetchProject",
          { projectArray: projectIdArray }
        );
        console.log("its response", response1);
        if (response1 && response1.data && response1.data.data) {
          setProjectDetails(response1.data.data);
        }
      } catch (error) {
        console.log("failed");
      }
    };
    fetchProject();
  }, [projectIdArray, isUpdate]);

  useEffect(() => {
    if (taskDetails && taskDetails.length > 0) {
      const sortedTasks = [...taskDetails].sort((taskA, taskB) => {
        if (taskA.dueDate < taskB.dueDate) {
          return -1;
        }
        if (taskA.dueDate > taskB.dueDate) {
          return 1;
        }

        const priorityOrder = {
          Low: 1,
          Medium: 2,
          High: 3,
        };

        const priorityA = priorityOrder[taskA.priority];
        const priorityB = priorityOrder[taskB.priority];

        return priorityA - priorityB;
      });

      setSortedTasks(sortedTasks);
    }
  }, [taskDetails]);

  useEffect(() => {
    try {
      if (
        user &&
        user.data &&
        taskDetails &&
        projectDetails &&
        taskDetails.length &&
        projectDetails.length
      ) {
        let busyTemp = Array(7).fill(0);
        const updatedAllDetails = projectDetails.map((project) => {
          const projectTasks = {
            projectId: project._id,
            projectName: project.projectName,
            todoTasks: [],
            completedTasks: [],
            overdueTasks: [],
          };
          taskDetails.forEach((task) => {
            const due = new Date(task.dueDate);
            task.contributorsId.map((contributor) => {
              if (contributor._id === user.data._id) {
                if (task.projectId === project._id) {
                  let priorityValue = task.priority === "High" ? 1.5 : (task.priority === "Medium" ? 1.25 : 1);
                  if (
                    currentTimeStamp <= due &&
                    contributor.completedOn === null
                  ) {
                    if (!projectTasks.todoTasks) {
                      projectTasks.todoTasks = [];
                    }
                    const millisecondsPerDay = 1000 * 60 * 60 * 24;
                    let days = Math.floor((due - currentTimeStamp) / millisecondsPerDay);


                    console.log(days)
                    for (let i = 0; i < days && i < 7; i++)
                      busyTemp[i] += priorityValue;
                    projectTasks.todoTasks.push(task);
                  } else if (contributor.completedOn !== null) {
                    if (!projectTasks.completedTasks) {
                      projectTasks.completedTasks = [];
                    }
                    projectTasks.completedTasks.push(task);
                  } else if (currentTimeStamp > due) {
                    if (!projectTasks.overdueTasks) {
                      projectTasks.overdueTasks = [];
                    }
                    busyTemp[0] += 1.75;
                    projectTasks.overdueTasks.push(task);
                  }
                }
              }
            });
          });
          console.log(busyArray)
          return projectTasks;
        });
        setAllDetails(updatedAllDetails);
        setBusyArray(busyTemp);
      }
    } catch (err) {}
  }, [taskDetails]);

  useEffect(() => {
    console.log(busyArray)
  }, [busyArray])

  return (
    user &&
    user.data && (
      <div className="w-full grid  grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mt-[0.95rem] pt-1">
        <UserPanel
          projectDetails={projectDetails}
          sortedTasks={sortedTasks}
          className=" grid-flow-row"
          user={user}
          allDetails={allDetails}
          busyArray={busyArray}
        />
        <div className="flex flex-col gap-4">
          <NotesHomePage className="" user={user} />
          <ProjectList user={user} sortedTasks={sortedTasks} />
        </div>
      </div>
    )
  );
};

export default HomeDashBoard;
