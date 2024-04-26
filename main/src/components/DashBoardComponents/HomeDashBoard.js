import axios from "axios";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NotesHomePage from "./HomeComponents/Notes/NotesHomePage";
import UserPanel from "./HomeComponents/userPanel/UserPanel";
import ProjectList from "./HomeComponents/ProjectListComponents/ProjectList";
import BusyChart from "./HomeComponents/BusyChart";
import Loader from "../Loader";
const HomeDashBoard = ({ user, isUpdate, isDisplay, setIsDisplay }) => {
  const [projectDetails, setProjectDetails] = useState([]);
  const [projectIdArray, setProjectIdArray] = useState([]);
  const [taskIdArray, setTaskIdArray] = useState([]);
  const [taskDetails, setTaskDetails] = useState([]);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [allDetails, setAllDetails] = useState([]);
  const [busyArray, setBusyArray] = useState(Array(7).fill(0));
  const [isLoading, setIsLoading] = useState(false);
  const currentTimeStamp = new Date();
  currentTimeStamp.setHours(0);
  currentTimeStamp.setMinutes(0);
  currentTimeStamp.setSeconds(0);
  currentTimeStamp.setMilliseconds(0);

  useEffect(() => {
    if (user && user.data && user.data.projectIds) {
      setIsLoading(true);
      setProjectIdArray(user.data.projectIds);
    }
  }, [user]);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.post(
          "https://collabo-hub-ten.vercel.app/api/v1/fetchTask",
          { tasks: taskIdArray }
        );
        if (response && response.data && response.data.data) {
          const updatedTaskDetails = response.data.data.map((task) => {
            task.contributorsId.forEach((contributor) => {
              if (contributor._id === user.data._id) {
                task.completed = contributor.completedOn !== null;
              }
            });
            return task;
          });
          setTaskDetails(updatedTaskDetails);
        }
      } catch (error) {
        console.log("Error fetching task details");
      }
    };

    fetchTaskDetails();
  }, [taskIdArray, isUpdate]);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.post(
          "https://collabo-hub-ten.vercel.app/api/v1/fetchProject",
          { projectArray: projectIdArray }
        );
        if (response && response.data && response.data.data) {
          setProjectDetails(response.data.data);
        }
        else
        {
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Error fetching project details");
      }
    };

    fetchProjectDetails();
  }, [projectIdArray, isUpdate]);

  useEffect(() => {
    const updateTaskIdArray = () => {
      const newTaskIdArray = projectDetails.reduce((acc, project) => {
        if (project.contributorsIds && project.contributorsIds.length > 0) {
          project.contributorsIds.forEach((contributor) => {
            if (contributor._id === user.data._id) {
              acc.push(...contributor.contributingTask);
            }
          });
        }
        return acc;
      }, []);
      setTaskIdArray(newTaskIdArray);
    };

    if (projectDetails.length > 0) {
      updateTaskIdArray();
    }
    else
    {
      setIsLoading(false);
    }
  }, [projectDetails]);

  useEffect(() => {
    if (taskDetails.length > 0) {
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
      setIsLoading(false);
    }
  }, [taskDetails]);

  useEffect(() => {
    if (
      user &&
      user.data &&
      taskDetails.length > 0 &&
      projectDetails.length > 0
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
          task.contributorsId.forEach((contributor) => {
            if (contributor._id === user.data._id) {
              if (task.projectId === project._id) {
                let priorityValue =
                  task.priority === "High"
                    ? 1.5
                    : task.priority === "Medium"
                    ? 1.25
                    : 1;
                if (
                  currentTimeStamp <= due &&
                  contributor.completedOn === null
                ) {
                  if (!projectTasks.todoTasks) {
                    projectTasks.todoTasks = [];
                  }
                  const millisecondsPerDay = 1000 * 60 * 60 * 24;
                  let days = Math.floor(
                    (due - currentTimeStamp) / millisecondsPerDay
                  );
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
        return projectTasks;
      });
      setAllDetails(updatedAllDetails);
      setBusyArray(busyTemp);
    }
  }, [taskDetails]);

  return (
    user &&
    user.data && (
      <div className="w-full">
        <Loader isDisplay={isLoading} />
        {!isLoading && (
          <motion.div
            className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mt-[0.95rem] pt-1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <UserPanel
                projectDetails={projectDetails}
                sortedTasks={sortedTasks}
                className=" grid-flow-row"
                user={user}
                allDetails={allDetails}
                busyArray={busyArray}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex flex-col gap-4">
                <NotesHomePage className="" user={user} />
                <ProjectList user={user} sortedTasks={sortedTasks} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    )
  );
};

export default HomeDashBoard;
