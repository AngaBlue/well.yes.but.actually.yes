import index = require("../index")
import { Message } from "../typings/Client/Message";
module.exports = {
    name: "me",
    aliases: [],
    usage: "me",
    description: "Returns your info",
    permission: 0,
    run: async function(message: Message): Promise<any> {
        return message.thread.broadcastText([
            `${"Name".__bold()}: ${message.user.username} (${message.threadItem.users[0].full_name})`,
            `${"ID".__bold()}: ${message.user.id}`,
            `${"Rank".__bold()}: ${message.user.rank.name}`,
            `${"Permission Level".__bold()}: ${message.user.rank.permission}`
        ].join("\n"));
    }
}