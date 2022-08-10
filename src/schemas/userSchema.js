import joi from 'joi';

export const searchUserSchema = joi.object({
	username: joi.string().required()
});