const chat = require("../../model/Chat/chat");
const message = require("../../model/Chat/message");
const user = require("../../model/User/user");
const connectedUser = require("../../model/User/connectedUser");

const { getIO } = require("../../socket");

exports.sendMessage = async (req, res) => {
  try {
    const { userId, textMessage, person2 } = req.body;
    let chatId = req.body.chatId;
    const existingUser = await user.findOne({ _id: userId });

    let flagIfNewChat = false;

    let existingChat = null;

    if (!chatId && person2) {
      console.log("Before");
      existingChat = await chat.create({
        persons: [person2, userId],
        type: "Personal",
      });
      console.log("After");

      const updatedUser = await user.updateMany(
        {
          _id: {
            $in: [person2, userId],
          },
        },
        {
          $addToSet: {
            chatGroup: [existingChat._id],
          },
        }
      );

      chatId = existingChat._id;
      flagIfNewChat = true;
    } else existingChat = await chat.findOne({ _id: chatId });

    // if (
    //   existingChat &&
    //   existingChat.persons &&
    //   existingChat.group &&
    //   existingChat.group.admin &&
    //   existingChat.group.groupMembers &&
    //   !existingChat.persons.includes(userId) &&
    //   !existingChat.group.admin.includes(userId) &&
    //   !existingChat.group.groupMembers.includes(userId)
    // ) {
    //   res.status(401).json({
    //     message: "401-USER",
    //   });
    //   return;
    // }

    console.log(chatId, userId, textMessage, person2);

    const date = new Date();

    const time = `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;

    const ddmmyy = `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;

    const messageTime = ddmmyy + " " + time;

    let peoplesToNotify = [
      ...existingChat.persons,
      ...existingChat.group.admin,
      ...existingChat.group.groupMembers,
    ];
    const deliveryStatus = {
      remaning: peoplesToNotify.map((ele) => ele !== userId),
    };

    const newMessage = await message.create({
      messageTime,
      chatId,
      content: textMessage,
      sender: userId,
      type: "textMessage",
      deliveryStatus,
    });

    if (newMessage) {
      await chat.updateOne(
        { _id: chatId },
        {
          $push: {
            messageId: newMessage._id,
          },
        }
      );
      newMessage.sender = existingUser;
      const response = await Promise.all(
        peoplesToNotify.map(async (ele) => {
          const sockets = await connectedUser.findOne({ userId: ele });
          if (sockets) {
            sockets.socketIds.forEach((id) => {
              getIO().to(id).emit("messageReceived", {
                newMessage,
              });
            });
          }
        })
      );
    }

    if (flagIfNewChat) {
      const sockets = await connectedUser.findOne({ userId });
      if (sockets) {
        sockets.socketIds.forEach((id) => {
          getIO().to(id).emit("newPersonalChat", {
            person2,
            chat: existingChat,
          });
        });
      }

      const sockets2 = await connectedUser.findOne({ userId: person2 });
      if (sockets2) {
        sockets2.socketIds.forEach((id) => {
          getIO().to(id).emit("newPersonalChat", {
            person2: existingUser,
            chat: existingChat,
          });
        });
      }
    }

    res.status(200).json({
      message: "Message Sends Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "BAD_REQUEST",
    });
  }
};
