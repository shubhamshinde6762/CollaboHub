import React from "react";
import { BarChart } from "@mui/x-charts";

const BusyChart = ({ busyArray }) => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const today = new Date();
  const dayLabels = [...Array(10)].map((_, index) => {
    const date = new Date();
    date.setDate(today.getDate() + index);
    const dayIndex = date.getDay();
    return dayIndex === today.getDay() ? "Today" : dayIndex === today.getDay() + 1 ? "Tomorrow" : daysOfWeek[dayIndex];
  });

  const colors = ["#1976D2"]; 
  const busyPercentageArray = busyArray.map(value => (value / 100) * 100);

  return (
    <div className="flex w-full">
      <div className="aspect-square w-full text-lg max-h-[50vh]">
        <BarChart
          responsive={true}
          series={[
            { data: busyPercentageArray, label: "Task Density Analysis", type: "bar", colors },
          ]}
          xAxis={[{ scaleType: "band", data: dayLabels }]}
          yAxis={[{ scaleType: "linear", title: "Busy Percentage (%)", domain: [0, 100] }]}
          leftAxis={null}
          tooltip={{ renderer: true }} 
        />
      </div>
    </div>
  );
};

export default BusyChart;
