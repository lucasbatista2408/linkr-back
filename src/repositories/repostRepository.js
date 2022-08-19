import client from '../database/db.js';

async function postReposts( userId, postId ){
	return client.query(`INSERT INTO reposts("userId", "postId")
                         VALUES ($1,$2)`,[userId, postId]);
}

export const repostRepository ={
	postReposts
};