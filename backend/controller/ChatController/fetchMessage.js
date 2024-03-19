const chat = require("../../model/Chat/chat");
const message = require("../../model/Chat/message");
const user = require("../../model/User/user");


exports.fetchMessages = async (req, res) => {
  try {
    const { userId, chatId, messageId } = req.body;
    const currentChat = await chat.findOne({ _id: chatId });
    
    if (!currentChat) {
        res.status(400).json({
            message: "400-CHAT",
        });
        return;
    }
    
    if (currentChat.type === "personal" && !currentChat.person.find(userId)) {
        res.status(401).json({
            message: "401-USER",
        });
        return;
    } else if (
        currentChat.type === "group" &&
        !currentChat.group.groupMembers.find(userId) &&
        !currentChat.group.admin.find(userId)
        ) {
            res.status(401).json({
                message: "401-USER",
            });
            return;
        }
        
        const response = await message.find({ _id: { $in: messageId } });
        console.log(userId, chatId, messageId)      
        
        const temp = await Promise.all(
            response.map(async (obj) => {
                obj.sender = await user.findOne({ _id: obj.sender });
                return obj;
            })
    );
    if (response) {
      res.status(200).json({
        messages : response,
      });
    }

  } catch (err) {
    res.status(500).json({
      message: err.message || "BAD-Request",
    });
  }
};
