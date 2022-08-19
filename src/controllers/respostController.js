import { repostRepository } from '../repositories/repostRepository.js';

export async function newRepost(req, res){
	const {userId, postId }= req.body;
	try {
		await repostRepository.postReposts( userId, postId);
		res.sendStatus(201);
	} catch (error) {
		res.status(500).send(error); 
	}
}