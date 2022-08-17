import client from '../database/db.js';

async function getCommentsQuerie(postId){
	return client.query(`SELECT *
                         FROM comments
                         WHERE "postId" = $1`, [postId]);
}

async function insertCommentQuerie( userId, postId, commentary ){
	return client.query(`INSERT INTO comments("userId", "postId", commentary)
                         VALUES ($1, $2, $3)`,[userId, postId, commentary]);
}

export const commentsRepository ={
	getCommentsQuerie,
	insertCommentQuerie
};