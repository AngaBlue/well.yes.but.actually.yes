import * as moment from "moment";
import index = require("../index")
import { Message } from "../typings/Client/Message";
module.exports = {
    name: "restart",
    aliases: [],
    usage: "restart",
    description: "Restarts the bot",
    permission: 5,
    run: async function (message: Message): Promise<any> {
        await message.thread.broadcastText(`Restarting...\nLast restarted ${moment(Date.now() - process.uptime()).fromNow()}`)
        console.log("User triggered restart")
        process.exit(0)
    }
}