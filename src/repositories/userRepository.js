import client from '../database/db.js';


async function searchUserQuerie(username){
	
	return client.query(`SELECT id, username, "profileImgUrl" 
                         FROM users 
                         WHERE username LIKE $1
                         ORDER BY username ASC;`, [username]);
}

async function getPostById(id) {
	return client.query(
		`SELECT posts.*, users.username, users."profileImgUrl"
		 FROM posts
		 JOIN users 
		 ON users.id = posts."userId"
         WHERE users.id = $1
		 ORDER BY posts.id DESC limit 20`,[id]);

}
export const pageRepository ={
	searchUserQuerie,
	getPostById
};