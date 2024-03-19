import React, { useEffect, useState } from "react";
import LoginDiv from "./LoginComponents/LoginDiv";
import SignUp from "./LoginComponents/SignUp";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser, user, socket }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate(`/dashboard/${user.data.username}`);
    }
  });
  const [isLogin, setLogin] = useState(true);

  return (
    <div className=" bg-purple-100 absolute left-0 top-0 w-full h-full">
      <container className="w-full h-full">
        {/* Inner Div */}
        {isLogin ? (
          <LoginDiv setUser={setUser} socket={socket} setLogin={setLogin} />
        ) : (
          <SignUp setUser={setUser} socket={socket} setLogin={setLogin} />
        )}
      </container>
    </div>
  );
};

export default Login;
