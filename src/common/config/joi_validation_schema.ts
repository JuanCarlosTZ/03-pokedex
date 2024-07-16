import * as Joi from "joi";

export const joiValidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3000),
    DEFAULT_PAGINATION_LIMIT: Joi.number().default(20),
});