import joi from "joi";


export default async function signUpSchema(req,res,next){

  const user = req.body
  console.log(user)

  const schema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    profileImg: joi.string().allow(''),
  })

  try {
    const {error} = schema.validate(user,{abortEarly: false});

    if (error) {
      console.error(error)
      return res.sendStatus(400);
    }

  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }

  next()

}