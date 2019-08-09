import { DirectThreadEntity } from "instagram-private-api";
import { DirectInboxFeedResponseItemsItem } from "instagram-private-api/dist/responses";
import * as moment from "moment";

import index = require("../index")
module.exports = {
    name: "restart",
    aliases: [],
    usage: "restart",
    description: "Restarts the bot",
    permission: "owner",
    run: async function (thread: DirectThreadEntity, message: DirectInboxFeedResponseItemsItem, args: string[]): Promise<any> {
        await thread.broadcastText(`Restarting...\nLast restarted ${moment(Date.now() - process.uptime()).fromNow()}`)
        console.log("User triggered restart")
        process.exit(0)
    }
}