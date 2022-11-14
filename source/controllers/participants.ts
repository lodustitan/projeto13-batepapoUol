import { Request, Response } from "express";
import { IParticipantsController } from "../types/interface.js";
import { HTTPStatusCodes } from './../types/interface';
import { repository } from '../repository/repository';


export class ParticipantsController implements IParticipantsController {
    async createParticipant(req: Request, res: Response): Promise<void> 
    {
        const name: string = String(res.locals.name);
        
        await repository.addParticipant(name);
        await repository.addMessage(name, "entra na sala...", "status");

        res.sendStatus(HTTPStatusCodes.Created);
    }

    async getAllParticipant(req: Request, res: Response): Promise<void>
    {
        const queryResult = await repository.getAllParticipant();

        res.status(HTTPStatusCodes.Created).send(queryResult);
    }

    async sendStatus(req: Request, res: Response): Promise<void>
    {
        const user: string = String(res.locals.user);

        await repository.updateParticipantStatus(user);

        res.sendStatus(HTTPStatusCodes.OK);
    }
}