import * as Request from "request";

import { Message } from "../typings/Client/Message";

module.exports = {
    name: "cat",
    aliases: [],
    usage: "cat",
    description: "Provides a random cat",
    permission: 0,
    run: async function (message: Message): Promise<any> {
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
            message.thread.broadcastLink(json[0].url, [json[0].url])
        });
    }
}