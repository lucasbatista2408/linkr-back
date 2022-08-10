import client from '../database/db.js';


async function searchUserQuerie(username){
	
	return client.query(`SELECT username 
                         FROM users 
                         WHERE username LIKE $1;`, [username]);
}
export const pageRepository ={
	searchUserQuerie
};