import {
	createHashtagId,
	createPostQuery,
	getPostQuery,
	deletePost,
	getPostId,
	updatePostQuery,
	searchHashtag,
	createPost_Hashtag
} from '../repositories/postRepository.js';
import urlMetadata from 'url-metadata';

export async function createPost(req, res) {
	const user = req.userId;
	const { url, description } = req.body;
	const values = [user, url, description];
	const lowerNames =[];
	console.log(description);
	const arr = description.split(' ');
	console.log(arr);
	const pureHashtags = arr.filter(e => e.startsWith('#'));
	console.log(pureHashtags);
	for (const v of pureHashtags ){
		lowerNames.push(v.toLowerCase());
	}
	console.log(lowerNames);
	
	const hashtags = [];

	lowerNames.forEach(function(item) {
		if(hashtags.indexOf(item) < 0) {
			hashtags.push(item);
		}
	});

	console.log(hashtags, hashtags.length);
	try {
		const post = await createPostQuery(values);
		const postId = post.id;
		console.log(postId);

		for(let i = 0; i < hashtags.length; i++){
			const hasHashtag = await searchHashtag(hashtags[i]);
	
			let hashtagId = 0;
			if(hasHashtag.length === 0) {
				const hashtag = await createHashtagId(hashtags[i]);
				hashtagId = hashtag[0].id;
				
			} else{
				hashtagId = hasHashtag[0].id;
				
			}
			const valuesHashtag = [postId, hashtagId];
		
			await createPost_Hashtag(valuesHashtag);
		}
		

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
	console.log(postId)
	const user = req.userId;
	console.log(user);
	const post = getPostId([postId]);
	try {
		if (post.userId === user) {
			await deletePost([postId]);
			return res.sendStatus(204);
		}else{
			return res.sendStatus(401);
		}
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}

export async function updatePost (req, res){
	const userId = req.userId;
	const {description,url, id}= req.body;
	try{
		const post = await updatePostQuery(description,url,id,userId);
		if(post.RowCount ===0){
			res.sendStatus(404);
			return;
		}
		res.status(200).send(post.rows[0]);
	}catch(error){
		res.status(500).send(error);
	}
}