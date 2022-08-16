import { pageRepository } from "../repositories/userRepository.js";

async function followMiddleware(req, res, next){
    const user = req.userId;
    const {id} = req.params;    
   
    if( isNaN(parseInt(id))) return res.sendStatus(422);
    
    const followerId = parseInt(user);
    const followedId = parseInt(id);
   
    if(followedId === followerId) return res.sendStatus(422);

    try {
        const {rowCount} = await pageRepository.getUserById(followedId);

        if( rowCount === 0) return res.sendStatus(404);

        req.follow = {followerId, followedId};
    
        next();
    
    } catch (error) {
        console.log(error);
		res.sendStatus(500);
    }

};

export default followMiddleware;