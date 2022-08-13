import {
	createHashtagId,
	createPostQuery,
	getPostQuery,
	searchHashtag
} from '../repositories/postRepository.js';
import urlMetadata from 'url-metadata';

export async function createPost(req, res) {
	const user = req.userId;
	const { url, description } = req.body;
	const values = [user, url, description];
	console.log(description);
	const arr = description.split(' ');
	console.log(arr);
	const hashtags = arr.filter(e => e.startsWith('#'))
	console.log(hashtags);

	try {
		await createPostQuery(values);
		
		//for(i = 0; i < hashtags.length; i++){
		//	const hasHashtag = await searchHashtag(hashtags[i]);
		//	if(!hasHashtag) await createHashtagId(hashtags[i]);
		//	 
		//}

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
	urlMetadata(url).then(
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