import { pageRepository } from '../repositories/userRepository.js';
import  followsRepo from '../repositories/followsRepo.js';


export async function searchUserControler(req, res){
	
	// search user by id
	if(req.query.id){
		const id = parseInt(req.query.id);
		if(isNaN(id)){
			res.status(422).send('Not a number');
			return;
		}
		try{
			const usernameById = await pageRepository.getUserById(id);
			if(usernameById.rowCount === 0){
				res.sendStatus(400);
				return;
			}
			res.status(200).send(usernameById.rows[0]);
			return;
		}catch(error){
			res.status(500).send(error);
			return;
		}
	}

	//search user by username like
	if(req.query.username){
		const percent = '%';
		const {username} = req.query;
		const id = parseInt(req.userId);
		const searchUsername = username?.concat(percent);
		try{
			const searchedUser = await pageRepository.searchUserQuerie(searchUsername);
			
			if(searchedUser.rowCount === 0){
				res.status(200).send('');
				return;
			}

			const usersAndFollowStatus = [];
			let item;
			let newItem;

			for(let i = 0; i < searchedUser.rowCount; i++){
				item = searchedUser.rows[i];
				newItem = await addFollowStatus(id, item.id, item);
				usersAndFollowStatus.push(newItem);
			}

			const users = usersAndFollowStatus.filter((item)=> item.id !== id );
			res.status(200).send(users);
			return;

		}catch(error){
			res.status(500).send(error);
			return;
		}
	}
	
}

export async function searchUserById (req, res){
	const id = parseInt(req.params.id);
	if(isNaN(id)){
		res.status(422).send('Not a number');
		return;
	}
	
	try{
		const postByUser = await pageRepository.getPostById(id);
		if(postByUser.rowCount === 0){
			res.status(200).send('');
			return;
		}
		res.status(200).send(postByUser.rows);
	}catch(error){
		res.status(500).send(error);
	}
}

export async function addFollowStatus(followerId, followedId, item){
	try {
		const values = [followerId, followedId];
		const {rowCount} = await followsRepo.searchFollower(values);
        
		if(rowCount > 0) return {...item, isFollower:true };
		else return {...item, isFollower:false };

	} catch (error) {
		console.log(error);
	}
}