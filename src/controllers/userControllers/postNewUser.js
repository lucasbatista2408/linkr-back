import {userRepo} from "../../repositories/userRepo.js";


export default async function postNewUser(req,res){
  
  const {username, email, password, profileImg, confirm_password} = req.body;

  const values = [username, email, password, profileImg, confirm_password]

  try {
    userRepo.postNewUserQuery(values)
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }

}