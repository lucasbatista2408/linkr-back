import {
	createPostQuery,
	getPostQuery,
	deletePost,
	getPostId
} from '../repositories/postRepository.js';
import urlMetadata from 'url-metadata';

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

export async function getDatasUrl(req, res) {
	const url = req.query.url;
	const datasUrl = {};
	urlMetadata(url, { descriptionLength: 100 }).then(
		function (metadata) {
			datasUrl.title = metadata.title;
			datasUrl.description = metadata.description;
			datasUrl.image = metadata['og:image'];
			datasUrl.uri = metadata.url;
			res.status(200).send(datasUrl);
		},
		function (error) {
			console.log(error);
			res.sendStatus(500);
		});

}
export async function deletePostId(req, res) {
	const postId = req.params.id;
	const user = req.userId;
	const post = getPostId([postId]);
	try {
		if (post.userId == user) {
			await deletePost([postId]);
			res.sendStatus(204);
		}else{
			res.sendStatus(401);
		}
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}



}