import { commentsRepository } from '../repositories/commentsRepository.js';

export async function getComments(req, res){
	const postId = parseInt(req.params.postId);
	if(isNaN(postId)){
		res.status(422).send('Not a number');
		return;
	}
	try{
		const comments = await commentsRepository.getCommentsQuerie(postId);
		if(comments.rowCount === 0){
			res.status(200).send(comments.rows);
			return;
		}
		res.status(200).send(comments.rows);
	}catch(error){
		res.status(500).send(error);
	}
}

export async function postComments(req, res){
	const {userId, postId, commentary} = req.body;
	try{
		await commentsRepository.insertCommentQuerie(userId, postId, commentary);
		res.sendStatus(201);
	}catch(error){
		res.status(500).send(error);
	}
}