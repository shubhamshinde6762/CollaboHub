import React from "react";
import ActionPanel from "./DashBoardComponents/ActionPanel";
import { BrowserRouter, useNavigate } from "react-router-dom";
import HomeDashBoard from "./DashBoardComponents/HomeDashBoard";

const Dashboard = (props) => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="relative h-full mt-4 flex overflow-clip">
        <ActionPanel className="h-full" updateStatus={props.updateStatus} user={props.user} />
      </div>
    </div>
  );
};

export default Dashboard;
