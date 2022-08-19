import joi from 'joi';

const commentSchema = joi.object({
	userId: joi.number().required(),
	postId: joi.number().required(),
	commentary:joi.string().min(1).max(200).required()
});

export default commentSchema;