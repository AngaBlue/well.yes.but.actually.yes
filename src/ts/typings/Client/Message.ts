import { DirectInboxFeedResponseItemsItem, DirectInboxFeedResponseThreadsItem } from "instagram-private-api/dist/responses";
import { User } from "./DatabaseObjects";
import {  DirectThreadEntity } from "instagram-private-api";

export interface Message extends DirectInboxFeedResponseItemsItem {
    user: User
    thread: DirectThreadEntity
    threadItem: DirectInboxFeedResponseThreadsItem
    args: string[]
}