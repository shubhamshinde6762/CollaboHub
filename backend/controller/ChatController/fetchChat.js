const chat = require("../../model/Chat/chat");
const message = require("../../model/Chat/message");
const user = require("../../model/User/user");

exports.fetchChat = async (req, res, next) => {
  try {
    const { userId, chatId } = req.body;

    const data = await Promise.all(
      chatId.map(async (obj) => {
        const response = await chat.findOne({ _id: obj });

        let currentChat = response;

        if (!currentChat) {
          console.log("Chat not Exists");
          return null;
        }

        currentChat.persons = await user.find({
          _id: { $in: currentChat.persons },
        });

        currentChat.group.admin = await user.find({
          _id: { $in: currentChat.group.admin },
        });

        currentChat.group.groupMembers = await user.find({
          _id: { $in: currentChat.group.groupMembers },
        });

        currentChat.group.admin.forEach((element) => {
          element.password = null;
        });

        currentChat.group.groupMembers.forEach((element) => {
          element.password = null;
        });

        currentChat.persons.forEach((element) => {
          element.password = null;
        });

        if (currentChat.messageId.length) {
          currentChat["lastMessage"] = await message.findOne({
            _id: currentChat.messageId[currentChat.messageId.length - 1],
          });

          currentChat.lastMessage.sender = await user.findOne({
            _id: currentChat.lastMessage.sender,
          });
          currentChat.lastMessage.sender.password = null;
        }

        return currentChat;
      })
    );

    // console.log(data);

    res.status(200).json({
      data: data.filter(Boolean),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "BAD-Request",
    });
  }
};
