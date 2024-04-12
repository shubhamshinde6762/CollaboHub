import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Invite from "../GeneralPurposeComponents/Invite";
import Tabular from "./ProjectComponents/Tabular";
import { GrPieChart } from "react-icons/gr";
import { FaTable } from "react-icons/fa";
import AddTaskForm from "./ProjectComponents/AddTaskForm";
import DeleteProject from "./ProjectComponents/DeleteProject";
import axios from "axios";
import CreatedTaskRow from "./ProjectComponents/TabularComponents/CreatedTaskRow";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import ComparisonChart from "./ProjectComponents/ComparisonChart";
import { motion } from "framer-motion";
import Loader from "../Loader";
const Project = (props) => {
  const isUpdate = props.isUpdate;
  const doUpdate = props.doUpdate;
  const socket = props.socket;
  const { projectId } = useParams();
  const [switchUi, setSwitchUi] = useState("Tabular");
  const [projectDetails, setProjectDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [owning, setOwningTask] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [realVsPredicted, setRealVsPredicted] = useState({
    allcompleted: [],
    allDue: [],
    allTaskName: [],
  });

  const [taskCount, setTaskCount] = useState({
    toDo: 0,
    completed: 0,
    exp: 0,
  });

  const fetchProject = async () => {
    try {
      setTaskCount({
        toDo: 0,
        completed: 0,
        exp: 0,
      });
      const response1 = await axios.post(
        "https://collabo-hub-ten.vercel.app/api/v1/fetchProject",
        { projectArray: [projectId] }
      );

      setProjectDetails(response1);
    } catch (error) {
      console.log("failed");
    }
  };
  const fetch = async () => {
    try {
      const response = await axios.post(
        "https://collabo-hub-ten.vercel.app/api/v1/fetchTask",
        {
          tasks: projectDetails.data.data[0].contributorsIds.find(
            (ele) => ele._id === props.user.data._id
          ).contributingTask,
        }
      );

      let comp = 0,
        todo = 0,
        exp = 0;
      let completed = [];
      let expiry = [];
      let alltasks = [];
      response.data.data.map((ele) => {
        // console.log("ele => ", ele);
        if (
          ele.contributorsId.find((ele) => ele._id === props.user.data._id)
            .completedOn
        ) {
          comp++;
          console.log("comp");
        } else {
          const timestampDate = new Date();
          const createdOnWithoutTime = ele.createdOn.split(" ")[0];
          const parts = createdOnWithoutTime.split("-");
          const rearrangedDate = new Date(
            `${parts[2]}-${parts[1]}-${parts[0]}`
          );
          const due = new Date(ele.dueDate);
          const dateObject = new Date(due);
          const year = dateObject.getFullYear();
          const month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
          const day = ("0" + dateObject.getDate()).slice(-2);
          const formattedDate = new Date(`${year}-${month}-${day}`);
          const totalMs = formattedDate - rearrangedDate;
          const totaldays = Math.ceil(totalMs / (1000 * 60 * 60 * 24));
          const differenceMs = due - timestampDate;
          const daysremaining = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
          if (daysremaining < 0) {
            exp++;
          } else {
            todo++;
          }
        }

        setTaskCount({
          toDo: todo,
          completed: comp,
          exp: exp,
        });
      });
      response.data.data.map((ele) => {
        console.log(
          "elemecscjhcgbjhcbjhvbhhvvghuyegvyuevguevgehvgbehvgbt",
          ele
        );
        ele.contributorsId.forEach((contri) => {
          if (
            contri._id == props.user.data._id &&
            contri.completedOn &&
            contri.completedOn !== null
          ) {
            completed.push(contri.completedOn);
            expiry.push(ele.dueDate);
            alltasks.push(ele.taskName);
          }
          // console.log("contri", contri);
        });
      });
      setRealVsPredicted({
        allcompleted: completed,
        allDue: expiry,
        allTaskName: alltasks,
      });
      const filteredTasks = response.data.data.filter(
        (task) => task.owner === props.user.data._id
      );
      console.log("allTasks", response.data.data);
      // console.log("f", filteredTasks);
      filteredTasks.forEach((ele) => {
        ele.contributorsId.forEach((contributor) => {
          const user = userDetails.data.data.find(
            (obj) => obj._id === contributor._id
          );
          if (user) {
            contributor.user = user;
          }
        });
      });

      setOwningTask(filteredTasks);
    } catch (err) {
      console.log("Error occured", err);
    }
  };

  useEffect(() => {
    fetch();
  }, [userDetails]);

  useEffect(() => {
    setIsLoading(true);
    fetchProject();
    return () => {};
  }, [projectId, isUpdate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userArray = [];
        for (const element of projectDetails.data.data) {
          for (const contributors of element.contributorsIds)
            userArray.push(contributors._id);
        }
        const response1 = await axios.post(
          "https://collabo-hub-ten.vercel.app/api/v1/fetchUser",
          { userArray }
        );
        setUserDetails(response1);
        setIsLoading(false);
      } catch (error) {
        console.log("failed");
      }
    };

    fetchData();

    return () => {
      // Cleanup operations, if any (e.g., unsubscribe, clear timers)
    };
  }, [projectDetails]);

  return (
    props.user &&
    props.user.data &&
    projectDetails.data &&
    projectDetails.data.data.length &&
    (!isLoading ? (
      <div className="flex xs:flex-wrap gap-4 justify-center w-full  relative mx-[2%] mt-4 ">
        <div className="flex flex-wrap items-center w-fit flex-col gap-4">
          <div className="flex flex-col gap-2 justify-center items-center">
            <motion.div
              initial={{ translateY: -100, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-fit bg-[#fcf8ff] rounded-xl"
            >
              {props.user && props.user.data && projectDetails.data && (
                <p className="text-3xl font-lato font-bold max-w-[260px] italic-text px-5 overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {`${projectDetails.data.data[0].projectName}`}
                </p>
              )}
            </motion.div>
            <motion.div
              initial={{ translateY: -100, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <AddTaskForm
                user={props.user}
                projectDetails={projectDetails}
                userDetails={userDetails}
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center gap-4"
          >
            <ComparisonChart
              realVsPredicted={realVsPredicted}
              isUpdate={isUpdate}
            />
            <div className="flex flex-col  w-full p-3 rounded-xl bg-[#fcf8ff] items-center justify-center">
              <div className="">
                {props.user && props.user.data && projectDetails.data && (
                  <p className="text-xl font-lato font-bold max-w-[240px]  italic-text px-5 overflow-ellipsis  overflow-hidden whitespace-nowrap">
                    Current Statastics
                  </p>
                )}
              </div>
              <div className="flex font-barlow aspect-video h-[25vh]  max-w-[26vw] xs:max-w-[90vw]  font-bold  right-0  items-center ">
                <PieChart
                  className="text-white"
                  sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                      fill: "white",
                      fontWeight: "bold",
                    },
                  }}
                  series={[
                    {
                      arcLabel: (item) => `${item.value}`,
                      arcLabelMinAngle: 45,
                      data: [
                        {
                          id: 0,
                          value: taskCount.toDo,
                          label: "To Do",
                          color: "#FF7F0E",
                        },
                        {
                          id: 1,
                          value: taskCount.completed,
                          label: "Completed",
                          color: "#2CA02C",
                        },
                        {
                          id: 2,
                          value: taskCount.exp,
                          label: "Expired",
                          color: "#D62728",
                        },
                      ],
                      innerRadius: 15,
                      paddingAngle: 1,
                      cornerRadius: 4,
                      highlightScope: {
                        faded: "global",
                        highlighted: "item",
                      },
                      faded: {
                        innerRadius: 35,
                        additionalRadius: -20,
                        color: "gray",
                      },
                    },
                  ]}
                  margin={{ right: 150 }}
                ></PieChart>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="flex flex-col w-full items-center gap-4 h-fit rounded-xl justify-center ">
          <div className="flex w-full flex-wrap gap-x-2 items-center justify-center ">
            <div className="flex-grow">
              <div className="flex flex-wrap rounded-full w-fit bg-[#fcf8ff] font-bold text-black p-[0.35rem] select-none py-2  ">
                <div
                  className={`${
                    switchUi === "Tabular"
                      ? "bg-purple-200 text-zinc-950 scale-105"
                      : ""
                  } ml-1 rounded-full transition-all duration-300 py-1 xs:text-xs px-3 cursor-pointer flex items-center gap-x-2 font-poppins`}
                  onClick={async () => setSwitchUi("Tabular")}
                >
                  <FaTable />
                  Assigned
                </div>
                <div
                  className={`${
                    switchUi === "Piechart"
                      ? "bg-purple-200 text-zinc-950 scale-105"
                      : ""
                  } py-1 transition-all duration-500 cursor-pointer xs:text-xs rounded-full mr-1 px-3 flex items-center gap-x-2 font-poppins`}
                  onClick={async () => setSwitchUi("Piechart")}
                >
                  <GrPieChart className="scale-125" />
                  Delegated
                </div>
              </div>
            </div>

            <div className=" text-white w-fit">
              {props.user &&
                props.user.data &&
                projectDetails.data &&
                projectDetails.data.data[0].owners.includes(
                  props.user.data._id
                ) && (
                  <Invite
                    user={props.user}
                    userDetails={userDetails}
                    projectDetails={projectDetails}
                  />
                )}
            </div>
            <div>
              {props.user &&
                props.user.data &&
                projectDetails.data &&
                projectDetails.data.data[0].owners.includes(
                  props.user.data._id
                ) && <DeleteProject projectId={projectId} user={props.user} />}
            </div>
          </div>
          <div className="flex-grow w-full flex justify-center items-center ">
            {switchUi === "Tabular" ? (
              <Tabular
                projectUpdate={isUpdate}
                doUpdate={doUpdate}
                socket={socket}
                projectId={projectId}
                user={props.user}
                userDetails={userDetails}
                projectDetails={projectDetails}
                className="w-full"
              />
            ) : (
              <CreatedTaskRow
                user={props.user}
                userDetails={userDetails}
                owning={owning}
                className="w-fill"
              />
            )}
          </div>
        </div>
      </div>
    ) : (
      <Loader isDisplay={isLoading} />  
    ))
  );
};

export default Project;
