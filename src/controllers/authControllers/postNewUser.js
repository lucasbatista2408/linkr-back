import {userRepo} from '../../repositories/authRepo.js';
import bcrypt from 'bcrypt';



export default async function postNewUser(req,res){
  

	const {username, email, password, profileImgUrl} = req.body;

	const encrypted_password = bcrypt.hashSync(password, 10);

	const values = [username, email, encrypted_password, profileImgUrl];

	const {rowCount} = await userRepo.selectFromUsersQuery([email])

	if(rowCount > 0) return res.status(409).send('email already in use')

	try {
		await userRepo.postNewUserQuery(values);
		res.sendStatus(201);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}


}