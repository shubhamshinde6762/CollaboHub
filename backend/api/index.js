const server = require("../index.js")
server.listen(process.env.PORT, () => console.log("Server Started"));

module.exports.server = server