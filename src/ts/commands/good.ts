import { DirectThreadEntity } from "instagram-private-api";
import { DirectInboxFeedResponseItemsItem } from "instagram-private-api/dist/responses";

import index = require("../index")
module.exports = {
    name: "good",
    aliases: [],
    usage: "good boi",
    description: "Makes this boi happy",
    run: async function(thread: DirectThreadEntity, message: DirectInboxFeedResponseItemsItem, args: string[]): Promise<any> {
        if (!args[0] || ["bot", "boi", "boy"].indexOf(args[0].toLowerCase()) === -1) return
            return thread.broadcastText("❤️")
    }
}