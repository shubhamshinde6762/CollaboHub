const user = require("../model/User/user");

exports.fetchUser = async (req, res) => {
  try {
    const { userArray } = req.body; 

    const data = [];

    for (const element of userArray) {
      const response = await user.findOne({ _id: element });
      response.password = null;
      response["checked"] = false;
      data.push(response);
    }

    res.status(200).json({
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: err.message || "BAD-REQUEST",
    });
  }
};
