import {userRepo} from "../../repositories/userRepo.js";
import bcrypt from 'bcrypt';


export default async function postNewUser(req,res){
  
  const {username, email, password, profileImg, confirm_password} = req.body;

  const encrypted_password = bcrypt.hashSync(password, 10)

  const values = [username, email, encrypted_password, profileImg]

  try {
    await userRepo.postNewUserQuery(values)
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }

}