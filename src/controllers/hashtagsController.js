import { hashtagRepo } from "../repositories/hashtagRepo.js";

export async function getHashtag(req, res){
    
    const {hashtag} = req.params;
    console.log(hashtag);
    
    try {
        
        const hashtagId = await hashtagRepo.searchHashtag(hashtag);
        console.log(hashtagId)
    
        const posts = await hashtagRepo.getPostsByHashtag(hashtagId);
        res.status(200).send(posts);

    } catch (error) {
        console.log(error);
		res.sendStatus(500);
    }

};


export async function getTrendingHashtags(req, res){

    try {
        const trending = await hashtagRepo.getTrending();
    
        res.status(200).send(trending);
        
    } catch (error) {
        console.log(error);
		res.sendStatus(500);
    }

}