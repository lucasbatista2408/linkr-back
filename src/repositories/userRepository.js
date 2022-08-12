import client from '../database/db.js';


async function searchUserQuerie(username){
	
	return client.query(`SELECT id, username, "profileImgUrl" 
                         FROM users 
                         WHERE username LIKE $1;`, [username]);
}
export const pageRepository ={
	searchUserQuerie
};