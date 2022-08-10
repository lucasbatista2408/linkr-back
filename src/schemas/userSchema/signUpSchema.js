import joi from "joi";


export default async function signUpSchema(req,res,next){

  const user = req.body

  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    profileImg: joi.string(),
    password: joi.string().required(),
    confirm_password: joi.string().valid(joi.ref('password')).required(),
  })

  try {
    const {error} = schema.validate(user,{abortEarly: false});

    if (error) {
      return res.sendStatus(400);
    }

  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }

  next()

}