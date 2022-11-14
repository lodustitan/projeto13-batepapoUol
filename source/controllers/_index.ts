import { MessagesController } from "./messages.js";
import { ParticipantsController } from "./participants.js";
import { UpdateController } from "./update.js";

export const controllers = {
    messages: new MessagesController(),
    participants: new ParticipantsController(),
    update: new UpdateController()
};