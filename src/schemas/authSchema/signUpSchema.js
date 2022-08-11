import joi from 'joi';

export const signUpschema = joi.object({
	username: joi.string().required(),
	email: joi.string().email().required(),
	password: joi.string().required(),
	profileImg: joi.string().allow(''),
});
