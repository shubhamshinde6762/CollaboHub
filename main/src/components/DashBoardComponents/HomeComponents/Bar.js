import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const Bar = ({ allDetails }) => {
  const maxTasks = Math.max(
    ...allDetails.map((project) =>
      Math.max(
        project.todoTasks.length,
        project.completedTasks.length,
        project.overdueTasks.length
      )
    )
  );
  const yScale = maxTasks + maxTasks/8;

  return (
    <div className="flex w-full ">
      <div className="h-[50vh] w-full">
        <BarChart
          // slotProps={{ legend: { hidden: true } }}
          series={[
            {
              data: allDetails.map((project) => project.todoTasks.length),
              name: "To Do",
              label: "To Do",
            },
            {
              data: allDetails.map((project) => project.completedTasks.length),
              name: "Completed",
              label: "Completed",
            },
            {
              data: allDetails.map((project) => project.overdueTasks.length),
              name: "Overdue",
              label: "Expired",
            },
          ]}
          xAxis={[
            {
              data: allDetails.map((project) => project.projectName),
              scaleType: "band",
            },
          ]}
          yAxis={[{
            min: 0,
            max: yScale,
          }]}
          responsive={true}
          margin={{ top: 60, bottom: 30, left: 40, right: 10 }}
        />
      </div>
    </div>
  );
};

export default Bar;
