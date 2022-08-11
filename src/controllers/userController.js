import { pageRepository } from '../repositories/userRepository.js';

export async function searchUserControler(req, res){
	const percent = '%';
	const {username} = req.body;
	const searchUsername = username.concat(percent);
	console.log(searchUsername);
	try{
		const searchedUser = pageRepository.searchUserQuerie(searchUsername);
		if(searchedUser.rowCount === 0){
			res.status(200).send('');
			return;
		}
		res.status(200).send(searchedUser.rows);
	}catch(error){
		res.status(500).send(error);
	}
}