import { NextFunction, Request, Response } from "express";

export enum HTTPStatusCodes {
    OK = 200,
    Created = 201,
    Unauthorized = 401,
    NotFound = 404,
    Conflict = 409,
    UnprocessableEntity = 422,
}

export interface IParticipantsController {
    createParticipant(req: Request, res: Response): Promise<void>;
    getAllParticipant(req: Request, res: Response): Promise<void>;
    sendStatus(req: Request, res: Response): Promise<void>;
}
export interface IMessagesController {
    createMessageParticipant(req: Request, res: Response): Promise<void>;
    getMessagesWithLimit(req: Request, res: Response): Promise<void>;
}

export interface IMiddleware {
    verifyIfNotHaveParticipant(req: Request, res: Response, next: NextFunction): Promise<void>;
    verifyParticipantIsValid(req: Request, res: Response, next: NextFunction): Promise<void>;
    verifyMessageUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}