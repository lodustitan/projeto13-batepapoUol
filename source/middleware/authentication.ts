import { Request, Response, NextFunction } from "express";
import { IMiddleware, HTTPStatusCodes } from "../types/interface.js";
import { schemas } from "../database/schema.js";
import { repository } from "../repository/repository.js";

export class Middleware implements IMiddleware {
    async verifyParticipantIsValid(req: Request, res: Response, next: NextFunction): Promise<void> 
    {
        const user = req.headers.user;
        const valid = schemas.participantSchema.validate({name: user});

        if(valid.error){
            res.status(HTTPStatusCodes.UnprocessableEntity).send("'user' empty or undefined");
            return;
        }

        const haveAccountName = await repository.getParticipantByName(String(user));
        
        if(haveAccountName){
            res.locals.user = user;
            next();
        }
        else{
            res.sendStatus(HTTPStatusCodes.Conflict);
        }
    }
    async verifyIfNotHaveParticipant(req: Request, res: Response, next: NextFunction): Promise<void>
    {
        const name = req.body.name;
        const valid = schemas.participantSchema.validate({name});

        if(valid.error){
            const errorMessages: string[] = valid.error.details.map((details: any) => details.message);
            res.status(HTTPStatusCodes.UnprocessableEntity).send(errorMessages);
            return;
        }

        const haveAccountName = await repository.getParticipantByName(name);

        if(!haveAccountName){
            res.locals.name = name;
            next();
        }
        else{
            res.sendStatus(HTTPStatusCodes.Conflict);
        }
    }
    async verifyMessageUser(req: Request, res: Response, next: NextFunction): Promise<void>
    {
        const headers = req.body;
        const valid = schemas.messageSchema.validate(headers);

        if(valid.error){
            const errorMessages: string[] = valid.error.details.map((details: any) => details.message);
            res.status(HTTPStatusCodes.UnprocessableEntity).send(errorMessages);
            return;
        }
        else 
        {
            res.locals.headers = headers;
            next();
        }
        
    }
}