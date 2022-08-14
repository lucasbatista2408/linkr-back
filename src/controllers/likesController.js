import { likesRepo } from '../repositories/likesRepo.js';


export async function getLikes(req,res){
	const {id} = req.params;
	if(isNaN(parseInt(id))) return res.sendStatus(400);

	const userId = req.userId;

	try {

		const hasPost = await likesRepo.searchPostQuerie(id);
		if(hasPost.rowCount == 0) return res.sendStatus(404);

		const {rowCount, rows: users} = await likesRepo.getLikesNumbersAndUsersQuerie(id);
        
		const hasUserLiked = users.filter(e => e.id === parseInt(userId));
        
		if(hasUserLiked.length != 0){

            const usersThatLiked = users.filter(e => e.id !== parseInt(userId));
			const usernamesThatLiked = usersThatLiked.map(e => e.username);
            
			const likes = {quantity: rowCount, users: usernamesThatLiked, hasUserLiked: true };
			return res.status(200).send(likes);
		}

		const usernamesThatLiked = users.map(e => e.username);
        
		const likes = {quantity: rowCount, users: usernamesThatLiked, hasUserLiked:false };
		res.status(200).send(likes);

	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function addLike(req,res){
    
	const {id} = req.params;
	if(isNaN(parseInt(id))) return res.sendStatus(400);

	const userId = req.userId;
    
	try {

		const hasPost = await likesRepo.searchPostQuerie(id);
		if(hasPost.rowCount == 0) return res.sendStatus(404);

		const params = [];
		const conditions = [];
		let whereClause = '';

		if(id){
			params.push(parseInt(id));
			conditions.push(`likes."postId" = $${params.length}`);
		}

		if(userId){
			params.push(parseInt(userId));
			conditions.push(`likes."userId" = $${params.length}`);
		}
        
		if(params.length > 0) {
			whereClause += `WHERE ${conditions.join(' AND ')}`;
		}

		const {rowCount} = await likesRepo.searchLikesQuerie(whereClause, params);

		if(rowCount > 0 ) return res.sendStatus(409);
        
		await likesRepo.addLikeQuerie(params);
		res.sendStatus(200);

	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function deleteLike(req,res){
	const {id} = req.params;
	if(isNaN(parseInt(id))) return res.sendStatus(400);

	const userId = req.userId;

	try {

		const hasPost = await likesRepo.searchPostQuerie(id);
		if(hasPost.rowCount == 0) return res.sendStatus(404);


		const params = [];
		const conditions = [];
		let whereClause = '';

		if(id){
			params.push(parseInt(id));
			conditions.push(`likes."postId" = $${params.length}`);
		}

		if(userId){
			params.push(parseInt(userId));
			conditions.push(`likes."userId" = $${params.length}`);
		}
        
		if(params.length > 0) {
			whereClause += `WHERE ${conditions.join(' AND ')}`;
		}

		const {rowCount} = await likesRepo.searchLikesQuerie(whereClause, params);

		if(rowCount == 0 ) return res.sendStatus(404);
        
		await likesRepo.deleteLikeQuerie(whereClause, params);
        
		res.sendStatus(204);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}
