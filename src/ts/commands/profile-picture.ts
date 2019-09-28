import index = require("../index")
import { Message } from "../typings/Client/Message";
module.exports = {
    name: "profile-picture",
    aliases: ["pfp"],
    usage: "profile-picture",
    description: "Gives a download link to your profile picture",
    permission: 0,
    run: async function(message: Message): Promise<any> {
        return message.thread.broadcastText(`${`${message.user.username}'s Profile Picture`.__bold()}:\n${message.threadItem.users[0].profile_pic_url}`)
    }
}