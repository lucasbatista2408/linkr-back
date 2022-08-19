import client from '../database/db.js';

async function searchFollower(values){

	return client.query('SELECT * FROM followers WHERE "followerId" = $1 AND "followedId" = $2;', values);
}

async function addFollower(values){

	return client.query('INSERT INTO followers ("followerId", "followedId") VALUES ($1, $2);', values);
}

async function deleteFollower(values){

	return client.query('DELETE FROM followers WHERE "followerId" = $1 AND "followedId" = $2;', values);
}

async function getFollowedsId(userId){
	return client.query('SELECT * FROM followers WHERE "followerId" = $1;', [userId]);
}

const followsRepo = {
	searchFollower,
	addFollower,
	deleteFollower,
	getFollowedsId
};

export default followsRepo;