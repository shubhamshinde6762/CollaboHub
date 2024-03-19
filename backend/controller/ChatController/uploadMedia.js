const chat = require("../../model/Chat/chat");
const message = require("../../model/Chat/message");
const user = require("../../model/User/user");
const connectedUser = require("../../model/User/connectedUser");;

const { getIO } = require("../../socket");
const cloudinary = require("cloudinary").v2;

exports.uploadMedia = async (req, res) => {
  try {
    const { userId, person2, textMessage, type } = req.body;
    // console.log(req.body.additionalData)

    console.log(req.body);

    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "No files were uploaded." });
    }

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

    console.log(chatId, userId, textMessage, person2);

    let content = {
      textMessage,
      url: "",
      originalName : req.files.file.name
    };

    console.log(req.files.file);

    await Promise.all([
      new Promise((resolve, reject) => {
        cloudinary.uploader.upload_large(
          req.files.file.tempFilePath,
          {
            resource_type: 'auto', // Cloudinary will detect the file type
            // Add other options as needed
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              console.log(result)
              resolve(result.secure_url);
            }
          }
        );
      })
        .then((url) => { 
          content.url = url;
          console.log(url);
        })
        .catch((error) => {
          res.status(500).json({ error });
        }),
    ]);

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
      content,
      sender: userId,
      type,
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
