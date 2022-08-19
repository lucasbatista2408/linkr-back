import followsRepo from '../repositories/followsRepo.js';
import { likesRepo } from '../repositories/likesRepo.js';

export async function getFollowers(req, res){

	const {followerId, followedId} = req.follow;

	try {

		let follow  = {
			followerId,
			followedId
		};
		const values = [followerId, followedId];
		console.log(follow, values);

		const {rowCount} = await followsRepo.searchFollower(values);
        
		if(rowCount > 0) {
			follow = {...follow, isFollower:true };
			return res.status(200).send(follow);
		}

		follow = {...follow, isFollower:false };
		res.status(200).send(follow);
        
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function createFollower(req,res){

	const {followerId, followedId} = req.follow;

	try {

		const values = [followerId, followedId];
		console.log(values);
        
		const {rowCount} = await followsRepo.searchFollower(values);

		if(rowCount > 0) return res.sendStatus(409);
        
		await followsRepo.addFollower(values);

		res.sendStatus(201);
        
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function deleteFollower(req,res){

	const {followerId, followedId} = req.follow;

	try {

		const values = [followerId, followedId];

		const {rowCount} = await followsRepo.searchFollower(values);
		if(rowCount === 0) return res.sendStatus(404);
        
		await followsRepo.deleteFollower(values);
		res.sendStatus(204);

	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

