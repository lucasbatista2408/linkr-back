import { repostRepo } from "../../repositories/repostRepo.js"

export default async function repostCount(req,res){

  try {
    const {rows: data} = await repostRepo.repostCountQuery();

    console.log(data)

    return res.status(200).send(data)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

