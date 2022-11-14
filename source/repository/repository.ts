import { client } from "../database/database.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

class Repository {
    async getAllParticipant() {
        const clientDb = await client.connect();
        const db = clientDb.db("uol-chat");
        
        const queryResult = await db.collection("participant").find().toArray();
        clientDb.close();
        return queryResult;
    }
    async getParticipantByName(name: string) {
        const clientDb = await client.connect();
        const db = clientDb.db("uol-chat");
        const haveAccountName = await db.collection("participant").findOne({name});
        return haveAccountName;
    }
    async addParticipant(name: string) {
        const clientDb = await client.connect();
        const db = clientDb.db("uol-chat");

        await db.collection("participant").insertOne({ name: name, lastStatus: new Date() });
        clientDb.close();
    }
    async removeParticipant(id: ObjectId) {
        const clientDb = await client.connect();
        const db = clientDb.db("uol-chat");

        await db.collection("participant").deleteOne({ _id: id });
        clientDb.close();
    }
    async updateParticipantStatus(name: string) {
        const clientDb = await client.connect();
        const db = clientDb.db("uol-chat");

        await db.collection("participant").updateOne({ name: name }, {$set: { lastStatus: new Date() }});
        clientDb.close();
    }
    async addMessage(name: string, text: string, typeMessage: string, toUser: string="Todos") {
        const clientDb = await client.connect();
        const db = clientDb.db("uol-chat");

        console.log({ from: name, to: toUser, text: text, type: typeMessage, time: dayjs().format("HH:MM:ss") });
        await db.collection("message").insertOne({ from: name, to: toUser, text: text, type: typeMessage, time: dayjs().format("HH:MM:ss") });
        clientDb.close();
    }
    async getMessages(limit: number, userName: string){
        const clientDb = await client.connect();
        const db = clientDb.db("uol-chat");

        const messages = await db.collection("message").find().limit(limit).toArray();
        clientDb.close();
        return messages;
    }
}

export const repository = new Repository();