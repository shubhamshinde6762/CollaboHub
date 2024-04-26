import React, { useEffect } from "react";
import ActionPanel from "./DashBoardComponents/ActionPanel";
import { BrowserRouter, useNavigate } from "react-router-dom";
import HomeDashBoard from "./DashBoardComponents/HomeDashBoard";

const Dashboard = (props) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   try {
  //     if (!localStorage.getItem("token")) navigate("/");
  //     console.log(props);
  //   } catch (error) {}
  // }, [props.user]);

  return (
    <div className="">
      <div className="relative h-full mt-4 flex overflow-clip">
        <ActionPanel
          className="h-full"
          updateStatus={props.updateStatus}
          user={props.user}
        />
      </div>
    </div>
  );
};

export default Dashboard;
