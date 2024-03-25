const express = require("express");
const cors = require("cors");
const expressFileUploader = require("express-fileupload");
const { dbConnect } = require("./db/db.js");
const { cdnConnect } = require("./db/cdn.js");
const { initSocket } = require("./socket.js");

const fetchChatData = require("./routes/ChatHandler/fetchChatData.js");
const sendMessage = require("./routes/ChatHandler/sendMessage.js");

const editProject = require("./routes/ProjectFunctions/editProject.js");
const fetchProject = require("./routes/ProjectFunctions/fetchProject.js");
const invite = require("./routes/ProjectFunctions/invite.js");

const taskHandler = require("./routes/TaskFunctions/taskHandler.js");
const authentication = require("./routes/User/authentication.js");
const updateUser = require("./routes/User/updateUser.js");
const note = require("./routes/User/notes.js");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(
  expressFileUploader({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(cors());

app.use("/api/v1", fetchChatData);
app.use("/api/v1", sendMessage);
app.use("/api/v1", authentication);
app.use("/api/v1", editProject);
app.use("/api/v1", fetchProject);
app.use("/api/v1", invite);
app.use("/api/v1", taskHandler);
app.use("/api/v1",updateUser);
app.use("/api/v1",note);

app.get("/about", (req, res) => {
  res.send("About route 🎉 ");
});

dbConnect();
cdnConnect();

app.get("/", (req, res) => res.send("Express on Vercel"));

const { server, io } = initSocket(app);
server.listen(process.env.PORT, () => console.log("Server Started"));
module.exports.io = io;
