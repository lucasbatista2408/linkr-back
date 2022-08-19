import client from '../database/db.js';


async function createRepost(values){

  const createRepostQuery = `INSERT INTO reposts ("postId", "userId") VALUES ($1,$2)`

  return client.query(createRepostQuery, values)
}

async function repostCountQuery(){

  const repostCount = `SELECT "postId", COUNT("postId") FROM reposts GROUP BY "postId"`

  return client.query(repostCount)
}

export const repostRepo = {
  createRepost,
  repostCountQuery
};