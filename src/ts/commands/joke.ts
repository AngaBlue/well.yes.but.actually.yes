import * as Request from "request";

import { DirectThreadEntity } from "instagram-private-api";
import { DirectInboxFeedResponseItemsItem } from "instagram-private-api/dist/responses";

module.exports = {
    name: "joke",
    aliases: ["dad-joke"],
    usage: "joke",
    description: "Tells a really bad joke",
        run: async function(thread: DirectThreadEntity, message: DirectInboxFeedResponseItemsItem, args: string[]): Promise<any> {
        Request({
            url: "https://icanhazdadjoke.com/",
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
            }
        }, (error, response, body) => {
            return thread.broadcastText(body);
        });
    }
}