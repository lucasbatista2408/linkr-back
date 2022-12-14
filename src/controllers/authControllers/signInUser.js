import { userRepo } from '../../repositories/authRepo.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export default async function signInUser(req,res){

	const {email, password} = req.body;

	const values = [email];

	const {rows: user, rowCount} = await userRepo.selectFromUsersQuery(values);
	try {
    
		if(rowCount !== 0 && bcrypt.compareSync(password, user[0].password)){

			const access_key = process.env.ACCESS_TOKEN_KEY;

			const token = jwt.sign(user[0].id, access_key);
			const object = {
				token: token,
				profileImgUrl: user[0].profileImgUrl,
				id: user[0].id
			};
			res.status(200).send(object);
		}else {
			return res.sendStatus(401);
		}
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}

}