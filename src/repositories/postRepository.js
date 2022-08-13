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

export async function searchHashtag(hashtag){
	const {rows} = await client.query(`SELECT * FROM hashtag WHERE hashtag LIKE $1;`, [hashtag])

	return rows;
}

export async function createHashtagId(hashtag){
	await client.query(`INSERT INTO hashtags (hashtag) VALUES ($1);`,[hashtag]);
}

export async function deleteHashtag(){}