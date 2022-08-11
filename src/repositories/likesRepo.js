import client from '../database/db.js';


async function searchPostQuerie(id){
	
	return client.query('SELECT * FROM posts WHERE id = $1;',[parseInt(id)]);
}

async function getLikesNumbersAndUsersQuerie(id){
	
	return client.query(`SELECT u.id, u.username
    FROM likes l
    JOIN posts p ON l."postId" = p.id
    JOIN users u ON l."userId" = u.id
    WHERE p.id = $1;`, [parseInt(id)]);
}

async function searchLikesQuerie(whereClause, params){
	
	return client.query(`SELECT * FROM likes ${whereClause};`, params);
}


async function addLikeQuerie(params){
	
	return client.query('INSERT INTO likes ("postId", "userId") VALUES ( $1, $2);', params);
}

async function deleteLikeQuerie(whereClause, params){
	
	return client.query(`DELETE FROM likes ${whereClause};`, params);
}

export const likesRepo ={
	searchPostQuerie,
	getLikesNumbersAndUsersQuerie,
	searchLikesQuerie,
	addLikeQuerie,
	deleteLikeQuerie
};