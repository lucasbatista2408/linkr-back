import client from '../database/db.js';


async function postNewUserQuery(values){

	const query = 'INSERT INTO "users" (username, email, password, "profileImg") VALUES ($1, $2, $3, $4)';

	return client.query(query, values);
}

async function signInUserQuery(values){

	const query = 'SELECT*FROM "users" WHERE email = $1';

	return client.query(query, values);
}

export const userRepo = {
	postNewUserQuery,
	signInUserQuery,
};