import {
	createPostQuery,
	getPostQuery
} from '../repositories/postRepository.js';

export async function createPost(req, res) {
	const user = req.userId;
	const { url, description } = req.body;
	const values = [user, url, description];
	try {
		await createPostQuery(values);
		res.sendStatus(201);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}

}
export async function getPost(req, res) {
	try {
		const posts = await getPostQuery();
		res.status(200).send(posts);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}

}
