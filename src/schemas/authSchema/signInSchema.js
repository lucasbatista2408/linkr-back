import joi from 'joi'


export default async function signInSchema(req,res,next){

  const user = req.body

  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  })

  try {
    const {error} = schema.validate(user,{abortEarly: false});

    if (error) {
      console.log(error.details)
      return res.sendStatus(400);
    }

  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }

  next()
  
}