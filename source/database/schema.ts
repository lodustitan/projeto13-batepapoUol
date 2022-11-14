import Joi, { ObjectSchema } from "joi";

class Schema {
    public participantSchema: ObjectSchema;
    public messageSchema: ObjectSchema;

    constructor (){
        this.participantSchema = Joi.object({
            name: Joi.string().required()
        });

        this.messageSchema = Joi.object({
            to: Joi.string().required(),
            text: Joi.string().required(),
            type: Joi.string().required()
        });
    }

} 

export const schemas = new Schema();