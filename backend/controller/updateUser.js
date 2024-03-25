const user = require("../model/User/user");
const connectedUser = require("../model/User/connectedUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getIO } = require("../socket");
const cloudinary = require("cloudinary").v2;

exports.updateUser = async (req, res) => {
  try {
    const { userId, email, password, username } = req.body;
    const existingUser = await user.findOne({ _id: userId });
    if (!existingUser) {
      return res.status(400).json({
        message: "InValid User",
      });
    }

    const existingUserForNewUsername = await user.findOne({ username });

    if (existingUser.username !== username && existingUserForNewUsername)
      return res.status(400).json({
        message: "Username Not Exists",
      });
    else existingUser.username = username;

    if (req.files && req.files.file) {
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
            existingUser.profilePhoto = url;
          })
          .catch((error) => {
            res.status(500).json({ error });
          }),
      ]);
    }

    let hashpw;

    try {
      hashpw = await bcrypt.hash(password, 10);
    } catch (err) {
      res.status(500).json({
        error: "error in Hashing",
      });
    }

    existingUser.password = hashpw;

    await existingUser.save();
    console.log(98756465464);

    const payload = {
      email: existingUser.email,
      username: existingUser.username,
    };

    let token = jwt.sign(payload, "shubham", { expiresIn: "2h" });
    existingUser.token = token;
    existingUser.password = undefined;

    const option = {
      expires: new Date(Date.now() + 3 * 24 * 3600 * 1000),
      httpOnly: true,
    };

    res.cookie("token", token, option).status(200).json({
      success: true,
      data: existingUser,
      message: "User Updated Successfully",
    });

    const sockets2 = await connectedUser.findOne({ userId });
    if (sockets2) {
      sockets2.socketIds.forEach((id) => {
        getIO().to(id).emit("userUpdated", {
          user: existingUser,
          message: "User Updated successfully",
        });
      });
    }
    console.log(123);
  } catch (err) {
    res.status(500).json({
      message: err.message || "BAD_REQUEST",
    });
  }
};
