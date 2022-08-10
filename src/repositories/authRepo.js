import client from '../database/db.js';


async function postNewUserQuery(values){

	const query = 'INSERT INTO "users" (username, email, password, "profileImg") ';

	await client.query(query, values);
}

async function signInUser(){

}

export const userRepo = {
	postNewUserQuery,
	signInUser,
};