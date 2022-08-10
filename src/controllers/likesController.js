import client from "../database/db.js";

export async function getLikes(req,res){
    const {id} = req.params;
    if(isNaN(parseInt(id))) return res.sendStatus(400);

    const userId =5;

    try {
        
        const {rowCount, rows: users} = await client.query(`SELECT u.id, u.username
        FROM likes l
        JOIN posts p ON l."postId" = p.id
        JOIN users u ON l."userId" = u.id
        WHERE p.id = $1;`, [id]);
        
        const hasUserLiked = users.filter(e => e.id === userId);
        
        console.log(rowCount, users, hasUserLiked);
        if(hasUserLiked.length != 0){
            const usersThatLiked = users.filter(e => e.id != userId);
            const usernamesThatLiked = usersThatLiked.map(e => e.username);
            console.log(usersThatLiked, usernamesThatLiked);
            
            const likes = {quantity: rowCount, users: usernamesThatLiked };
            return res.status(200).send(likes);
        }

       
        const usernamesThatLiked = users.map(e => e.username);
        console.log( usernamesThatLiked);
        
        const likes = {quantity: rowCount, users: usernamesThatLiked };
        res.status(200).send(likes);

    } catch (error) {SELECT
        console.log(error);
        res.sendStatus(500);
    }
};

export async function addLike(req,res){
    
    const {id} = req.params;
    if(isNaN(parseInt(id))) return res.sendStatus(400);

    const userId =5;
    //const userId = req.user??
    
    try {
        const params = [];
        const conditions = [];
        let whereClause = '';

        if(id){
            params.push(parseInt(id));
            conditions.push(`likes."postId" = $${params.length}`);
        };

        if(userId){
            params.push(parseInt(userId));
            conditions.push(`likes."userId" = $${params.length}`);
        };
        
        if(params.length > 0) {
            whereClause += `WHERE ${conditions.join(' AND ')}`;
        };

        const {rowCount} = await client.query(`SELECT * FROM likes ${whereClause};`, params);

        console.log(rowCount, id, userId, whereClause, params);

        if(rowCount > 0 ) return res.sendStatus(409);
        
        await client.query(`INSERT INTO likes ("postId", "userId") VALUES ( $1, $2);`, params);
        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export async function deleteLike(req,res){
    const {id} = req.params;
    if(isNaN(parseInt(id))) return res.sendStatus(400);

    const userId =5;
    //const userId = req.user??

    try {

        const params = [];
        const conditions = [];
        let whereClause = '';

        if(id){
            params.push(parseInt(id));
            conditions.push(`likes."postId" = $${params.length}`);
        };

        if(userId){
            params.push(parseInt(userId));
            conditions.push(`likes."userId" = $${params.length}`);
        };
        
        if(params.length > 0) {
            whereClause += `WHERE ${conditions.join(' AND ')}`;
        };

        const {rowCount} = await client.query(`SELECT * FROM likes ${whereClause};`, params);

        console.log(rowCount, id, userId, whereClause, params);

        if(rowCount == 0 ) return res.sendStatus(404);
        
        await client.query(`DELETE FROM likes ${whereClause};`, params);
        
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
