
import client from '../database/db.js';

export async function createPostQuery(values) {
	await client.query(`INSERT INTO posts (
		"userId", url, description
		)
		 VALUES(
			$1,$2,$3
		 )`, values);
}
export async function getPostQuery() {
	const { rows: posts } = await client.query(
		`SELECT posts.*, users.username, users."profileImgUrl"
		 FROM posts
		 JOIN users 
		 ON users.id = posts."userId"
		 ORDER BY posts.id DESC limit 20`);

	return posts;

}

export async function deletePost(value) {
	await client.query(
		`DELETE FROM likes 
		WHERE "postId" = $1
		`, value
	);
	await client.query(
		`DELETE FROM post_hashtag
		WHERE "postId" = $1
		`, value
	);
	await client.query(
		`DELETE FROM posts
		WHERE id = $1
		`, value
	);
}

export async function getPostId(value){
	const {rows:post}=await client.query(
		'SELECT * posts WHERE id = $1',value
	);
	return post;
}

export async function updatePostQuery(description, url,id, userId){
	return client.query(`UPDATE posts
						 SET description =$1, url = $2
	                     WHERE id = $3 AND "userId"= $4
						 RETURNING url, description`,[description,url,id, userId]);
}