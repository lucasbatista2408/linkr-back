import { pageRepository } from '../repositories/userRepository.js';

export async function searchUserControler(req, res){
	const percent = '%';
	const {username} = req.params;
	const id = req.userId;
	const searchUsername = username?.concat(percent);
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