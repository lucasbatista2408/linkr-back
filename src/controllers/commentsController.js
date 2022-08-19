import { commentsRepository } from '../repositories/commentsRepository.js';
import { addFollowStatus } from './userController.js';

export async function getComments(req, res){
	const postId = parseInt(req.params.postId);
	const id = parseInt(req.userId);
	if(isNaN(postId)){
		res.status(422).send('Not a number');
		return;
	}
	try{
		const comments = await commentsRepository.getCommentsQuerie(postId);
		// const isFollowed = await followsRepo.searchFollower
		if(comments.rowCount === 0){
			res.status(200).send(comments.rows);
			return;
		}
		const commentsFollower = [];
		let item;
		let newItem;

		for(let i = 0; i < comments.rowCount; i++){
			item = comments.rows[i];
			newItem = await addFollowStatus(id, item.userId ,item);
			commentsFollower.push(newItem);
		}
		res.status(200).send(commentsFollower);
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