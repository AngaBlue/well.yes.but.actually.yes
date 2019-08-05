import { DirectThreadEntity } from "instagram-private-api";
import { DirectInboxFeedResponseItemsItem } from "instagram-private-api/dist/responses";

import index = require("../index")
module.exports = {
    name: "test",
    aliases: ["t"],
    usage: "test",
    description: "Test command",
    run: async function(thread: DirectThreadEntity, message: DirectInboxFeedResponseItemsItem, args: string[]): Promise<any> {
        return thread.broadcastText("Bot is online and responding! :)))")
    }
}