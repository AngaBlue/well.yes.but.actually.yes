import * as Request from "request";

import { DirectThreadEntity } from "instagram-private-api";
import { DirectInboxFeedResponseItemsItem } from "instagram-private-api/dist/responses";

module.exports = {
    name: "cat",
    aliases: [],
    usage: "cat",
    description: "Provides a random cat",
    run: async function (thread: DirectThreadEntity, message: DirectInboxFeedResponseItemsItem, args: string[]): Promise<any> {
        Request({
            url: "https://api.thecatapi.com/v1/images/search",
            method: 'GET',
            headers: {
                'x-api-key': "c82c88aa-ccaa-41a4-a916-86fb2d2459c3"
            }
        }, (error, response, body) => {
            let json = JSON.parse(body)
            /*Request({
                url: json[0].url,
                method: 'GET',
                encoding: null
            }, (error, response, buffer) => {
                return thread.broadcastPhoto({
                    file: buffer,
                    allowFullAspectRatio: true
                });
            })*/
            thread.broadcastLink(json[0].url, [json[0].url])
        });
    }
}