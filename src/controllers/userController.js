import { pageRepository } from '../repositories/userRepository.js';


export async function searchUserControler(req, res){
	const percent = '%';
	const {username} = req.query;
	const id = req.userId;
	const searchUsername = username?.concat(percent);
	console.log(username);
	try{
		const searchedUser = await pageRepository.searchUserQuerie(searchUsername);
		if(searchedUser.rowCount === 0){
			res.status(200).send('');
			return;
		}
		const users = searchedUser.rows.filter((item)=> item.id !== id );
		res.status(200).send(users);
	}catch(error){
		res.status(500).send(error);
	}
}

export async function searchUserById (req, res){
	const id = parseInt(req.params.id);
	if(isNaN(id)){
		res.status(422).send('Not a number');
		return;
	}
	console.log(id);
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