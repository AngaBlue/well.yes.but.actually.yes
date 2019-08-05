import { DirectThreadEntity } from "instagram-private-api";
import { DirectInboxFeedResponseItemsItem } from "instagram-private-api/dist/responses";

import index = require("../index")
module.exports = {
    name: "say",
    aliases: [],
    usage: "say <message>",
    description: "Says whatever you say",
    run: async function(thread: DirectThreadEntity, message: DirectInboxFeedResponseItemsItem, args: string[]): Promise<any> {
        if (!args[0])
            return thread.broadcastText("I can't just say nothing! :))")
        return thread.broadcastText(args.join(" "))
    }
}