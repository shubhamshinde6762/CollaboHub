import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function ComparisonChart({ realVsPredicted }) {
  const { allcompleted, allDue, allTaskName } = realVsPredicted;
  const [data, setData] = useState({
    pdata: [],
    udata: [],
    xlables: [],
  });

  useEffect(() => {
    console.log(realVsPredicted);
    try {
      const pData = allDue.map((dueDate) => {
        const date = new Date(dueDate);
        date.setHours(23, 59, 0, 0);
        return date;
      });

      const uData = allcompleted.map((completedOn) => {
        const date = new Date(completedOn.split(" ")[0]);
        date.setHours(
          completedOn.split(" ")[1].split(".")[0],
          completedOn.split(" ")[1].split(".")[1],
          0,
          0
        );
        return date;
      });

      // Combine uData, pData, and allTaskName for easier sorting
      const combinedData = uData.map((date, index) => ({
        uDate: date,
        pData: pData[index],
        taskName: allTaskName[index],
      }));

      combinedData.sort((a, b) => a.uDate - b.uDate);

      const sortedUData = combinedData.map((data) => data.uDate);
      const sortedPData = combinedData.map((data) => data.pData);
      const sortedTaskNames = combinedData.map((data) => data.taskName);

      setData({
        udata: sortedUData,
        pdata: sortedPData,
        xlables: sortedTaskNames,
      });
    } catch (err) {}
  }, [realVsPredicted]);

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 9);

  return (
    <div className="bg-[#fcf8ff] max-w-[28vw] h-[35vh] text-xs xs:max-w-[95vw] aspect-video p-2 rounded-xl ">
      <LineChart
        animation={true}
        responsive={true}
        
        series={[
          { data: data.pdata, label: "Due Date" },
          { data: data.udata, label: "Completed On" },
        ]}
        xAxis={[{ scaleType: "point", data: data.xlables }]}
        yAxis={[
          {
            scaleType: "time",
            ticks: {
              formatter: (tick) => new Date(tick).toLocaleDateString(),
            },
            unit: "day",
            domain: [startDate.getTime(), endDate.getTime()],
          },
        ]}
      />
    </div>
  );
}
