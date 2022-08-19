import joi from 'joi';

export const repostSchema = joi.object({
	userId: joi.number().required(),
	postId:joi.number().required()
});