const task = require("../../model/Project/task");

exports.fetchTasks = async (req, res) => {
  try {
    const { tasks } = req.body;

    const data = await Promise.all(tasks.map(async (ele) => {
    //   console.log(ele);
      const response = await task.findOne({ _id: ele });
      return response;
    }));

    res.status(200).json({
      status: 200,
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: err.message || "BAD-Request",
    });
  }
};
