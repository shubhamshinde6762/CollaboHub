const chat = require("../../model/Chat/chat");
const user = require("../../model/User/user");

exports.createGroup = async (req, res) => {
  try {
    const { userId, profilePhoto, groupName, groupMembers } = req.body;
    console.log(groupMembers);
    const savedChat = await chat.create({
      type: "Project",
      persons : [userId, ...groupMembers],
      group: {
        admin: [userId],
        chatName: groupName,
        groupMembers,
      },
    });

    console.log(123);
    // const savedChat = await newGroup.save();
    if (req.body.files && req.files.file) {
      await Promise.all([
        new Promise((resolve, reject) => {
          cloudinary.uploader.upload(
            req.files.file.tempFilePath,
            {
              resource_type: "auto",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result.secure_url);
              }
            }
          );
        })
          .then((url) => {
            savedChat.profilePhoto = url;
          })
          .catch((error) => {
            res.status(500).json({ error });
          }),
      ]);
    }

    const userToUpdate = await user.updateMany(
      {
        _id: {
          $in:  [...groupMembers, userId],
        },
      },
      {
        $push: {
          chatGroup: savedChat._id,
        },
      }
    );

    console.log(userToUpdate)

    console.log(userToUpdate);

    res.status(200).json(savedChat);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err || "BAD-REQUEST",
    });
  }
};
