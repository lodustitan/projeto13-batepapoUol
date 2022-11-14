import { Request, Response } from "express";
import { IMessagesController } from "../types/interface.js";
import { HTTPStatusCodes } from './../types/interface.js';
import { repository } from '../repository/repository.js';

export class MessagesController implements IMessagesController {
    async createMessageParticipant(req: Request, res: Response): Promise<void>
    {
        const headers = res.locals.headers;
        const name = res.locals.name;

        await repository.addMessage(name, headers.text, headers.type, headers.to);
        res.status(HTTPStatusCodes.Created).send("Criado");
    }
    async getMessagesWithLimit(req: Request, res: Response): Promise<void>
    {
        const queryString = req.query;
        const user = res.locals.user;
        let msgs;

        if(queryString.limit){
            const limitNumber: number = Number(queryString.limit); 
            msgs = await repository.getMessages(limitNumber, user);
        }
        else{
            msgs = await repository.getMessages(100, user);
        }
        res.status(HTTPStatusCodes.OK).send(msgs);
    }
}