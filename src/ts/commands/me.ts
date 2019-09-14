import index = require("../index")
import { Message } from "../typings/Client/Message";
module.exports = {
    name: "me",
    aliases: [],
    usage: "me",
    description: "Returns some info about you!",
    permission: 0,
    run: async function(message: Message): Promise<any> {
        return message.thread.broadcastText(`Name: ${message.user.username} (${message.threadItem.users[0].full_name})\nID: ${message.user.id}\nRank: ${message.user.rank.name}\nPermission Level: ${message.user.rank.hierachy}`)
    }
}