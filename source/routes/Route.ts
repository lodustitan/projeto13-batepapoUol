import express from "express";
import cors from "cors";

import { controllers } from "../controllers/_index.js";
import { middleware } from "../middleware/_index.js";

const app = express();
app.use(express.json());
app.use(cors());

// setInterval(controllers.update.deleteAFKusers, 1000 * 15);

/* Rotas Express.js */
app.post("/status", middleware.verifyParticipantIsValid, controllers.participants.sendStatus);
app.post("/participants", middleware.verifyIfNotHaveParticipant, controllers.participants.createParticipant);
app.get("/participants", controllers.participants.getAllParticipant);
app.post("/messages", middleware.verifyMessageUser, middleware.verifyParticipantIsValid, controllers.messages.createMessageParticipant);
app.get("/messages", middleware.verifyParticipantIsValid, controllers.messages.getMessagesWithLimit);
// app.delete("/messages/:id", controllers.messages);
// app.put("/messages/:id", controllers.messages);

export { app };