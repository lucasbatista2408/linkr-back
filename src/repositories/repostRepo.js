import client from '../database/db.js';


async function createRepost(values){

  const createRepostQuery = `INSERT INTO repost ("postId", "userId") VALUES ($1,$2)`

  return client.query(createRepostQuery, values)
}

async function repostCountQuery(){

  const repostCount = `SELECT "postId", COUNT("postId") FROM repost GROUP BY "postId"`

  return client.query(repostCount)
}

export const repostRepo = {
  createRepost,
  repostCountQuery
};