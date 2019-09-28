import index = require("../index")
import { Message } from "../typings/Client/Message";
module.exports = {
    name: "good-boi",
    aliases: ["good-boy", "good-bot"],
    usage: "good-boi",
    description: "Makes this boi happy",
    permission: 0,
    run: async function (message: Message): Promise<any> {
        return message.thread.broadcastText("❤️")
    }
}