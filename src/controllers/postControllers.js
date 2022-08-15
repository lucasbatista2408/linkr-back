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
import { hashtagRepo } from '../repositories/hashtagRepo.js';
import urlMetadata from 'url-metadata';

function hashtagSeparator(description){
	const lowerNames =[];
	const arr = description.split(' ');
	const pureHashtags = arr.filter(e => e.startsWith('#'));
	for (const v of pureHashtags ){
		lowerNames.push(v.toLowerCase());
	}
	const hashtags = [];
	lowerNames.forEach(function(item) {
		if(hashtags.indexOf(item) < 0) {
			hashtags.push(item);
		}
	});
	return hashtags;
}

async function insertHashtags(hashtags,postId){
	let hashtagId = 0;
	let hasHashtag = null;
	for(let i = 0; i < hashtags.length; i++){
		hasHashtag = await searchHashtag(hashtags[i]);
		if(hasHashtag?.length === 0) {
			const hashtag = await createHashtagId(hashtags[i]);
			hashtagId = hashtag[0].id;
			
		} else{
			hashtagId = hasHashtag[0].id;
			
		}
		const valuesHashtag = [postId, hashtagId];
	
		await createPost_Hashtag(valuesHashtag);
	}
}

export async function createPost(req, res) {
	const user = req.userId;
	const { url, description } = req.body;
	const values = [user, url, description];
	const hashtags = hashtagSeparator(description);
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
	const user = req.userId;
	try {
		const post = await getPostId([postId]);
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
	const hashtags = hashtagSeparator(description);
	try{
		await hashtagRepo.deleteByPostId(parseInt(id));
		const post = await updatePostQuery(description,url,parseInt(id),parseInt(userId));
		if(post.RowCount ===0){
			res.sendStatus(404);
			return;
		}
		await insertHashtags(hashtags,parseInt(id));
		await hashtagRepo.deleteHashtags();
		res.status(200).send(post.rows[0]);
	}catch(error){
		res.status(500).send(error);
	}
}