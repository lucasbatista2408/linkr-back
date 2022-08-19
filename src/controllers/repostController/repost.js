import { repostRepo } from "../../repositories/repostRepo.js"

export default async function repost(req,res){

  const {postId, userId} = req.body

  const values = [postId, userId]

  try {
    const response = await repostRepo.createRepost(values)

    console.log(response)

    return res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}