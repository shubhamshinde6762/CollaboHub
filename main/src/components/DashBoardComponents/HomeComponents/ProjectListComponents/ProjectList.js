import React, { useEffect, useState } from "react";
import { FaTasks } from "react-icons/fa";
import { PieChart } from "react-minimal-pie-chart";
const ProjectList = ({ sortedTasks, user }) => {
  const [tasksToRender, setTaskToRender] = useState(null);

  useEffect(() => {
    // setTaskToRender(null);
    let temp = sortedTasks;
    temp &&
      temp.map((ele) => {
        if (!ele.completed) {
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
          ele.totaldays = totaldays;
          const differenceMs = due - timestampDate;
          const daysremaining = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
          if (daysremaining < 0) {
            ele.daysleft = 0;
          } else if (daysremaining === 0) {
            ele.daysleft = 0;
            ele.daysStatus = "LAST DAY!!!";
          } else {
            ele.daysleft = daysremaining;
            ele.daysStatus = daysremaining.toString() + " days remaining";
          }
        }
      });

    setTaskToRender(temp);
  }, [sortedTasks]);

  const getPriorityColor = (priority) => {
    const colorMap = {
      High: "#fee2e1", // Red
      Medium: "#fef9c2", // Yellow
      Low: "#dbeafe", // Blue
      Default: "#808080", // Gray
    };

    return colorMap[priority] || colorMap["Default"];
  };

  return (
    tasksToRender !== null &&
    tasksToRender && (
      <div className="min-w-[275px]  bg-[#fcf8ff] w-[95%] mx-[2.5%] rounded-xl p-3 px-4 min-h-[37vh] h-full shadow">
        <div className="grid grid-cols-1 grid-flow-dense md:grid-cols-2 h-[39vh]  w-full gap-2  p-2 custom-scrollbar overflow-y-scroll">
          {tasksToRender &&
            tasksToRender.map((task) => {
              return (
                !task.completed && (
                  <div
                    className="shadow flex flex-wrap relative gap-3  justify-center w-full p-2 cursor-pointer rounded-xl min-h-[15vh] h-fit hover:scale-[90%] transition-transform duration-300"
                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                  >
                    <div className="absolute text-sm bg-red-500 text-white font-bold px-2 rounded-xl -right-1 -top-1">
                      {task.dueDate}
                    </div>
                    <div className="min-w-[40px] max-w-[70px]">
                      <PieChart
                      
                        className=" w-"
                        data={[
                          {
                            title: "Days Left",
                            value: task.daysleft,
                            color: "#00FF00",
                          },
                          {
                            title: "Total Days",
                            value: task.totaldays - task.daysleft,
                            color: "#ff0000",
                          },
                        ]}
                        labelPosition={50}
                        lengthAngle={360}
                        lineWidth={25}
                        paddingAngle={0}
                        radius={50}
                        rounded
                        animate
                        reveal={100}
                        startAngle={270}
                        viewBoxSize={[100, 100]}
                        height={90}
                      >
                        {/* Text to be displayed */}
                        <text
                          x="50"
                          y="50"
                          dominantBaseline="middle"
                          textAnchor="middle"
                          className="text-xl"
                          style={{ fontSize: "20px", fill: "black", fontWeight:"bold" }}
                        >
                          {task.daysleft >= 0 ? task.daysleft : "EXP"}/
                          {task.totaldays}
                        </text>
                      </PieChart>
                    </div>
                    <div className="flex flex-col justify-center min-w-[100px]">
                      <div className="font-bold text-sm font-poppins">{task.taskName}</div>
                      <div className="font-sans font-bold text-sm">
                        Assigned On : <div className="bg-green-500 w-fit px-2 rounded-xl text-white mt-1">{task.createdOn.split(' ')[0]}</div>
                      </div>
                    </div>
                  </div>
                )
              );
            })}
        </div>
      </div>
    )
  );
};

export default ProjectList;
