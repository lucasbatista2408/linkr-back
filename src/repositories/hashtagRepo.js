import client from "../database/db.js";

async function searchHashtag(hashtag){
    const {rows} = await client.query(`SELECT * FROM hashtags WHERE hashtag ILIKE $1;`,[`#${hashtag}`]);
    const hashtagId = rows[0].id;
    return hashtagId

}

async function getPostsByHashtag(hashtagId){
    const {rows} = await client.query(`SELECT p.*, u.username, u."profileImgUrl" 
    FROM post_hashtag ph
    JOIN posts p 
    ON p.id = ph."postId"
    JOIN users u
    ON u.id = p."userId"
    WHERE "hashtagId" = $1
    ORDER BY p.id DESC limit 20;`,[hashtagId]);

    return rows;
}

async function getTrending(){
    const {rows} = await client.query(`SELECT COUNT(ph.id) , ph."hashtagId", h.hashtag 
    FROM post_hashtag ph JOIN hashtags h ON h.id = ph."hashtagId" 
    GROUP BY ph."hashtagId", h.id ORDER BY count DESC LIMIT 10; `
    );

    return rows
}

export const hashtagRepo = {
    searchHashtag,
    getPostsByHashtag,
    getTrending
}