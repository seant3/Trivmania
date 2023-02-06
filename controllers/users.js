import UserModel from "../models/UserModel.js"
import PostM from '../models/PostM.js'
import jwt from "jsonwebtoken"
const SECRET = process.env.SECRET;

export default {
  signup,
  login,
  profile
};


async function signup(req, res) {
  const user = new UserModel(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
 
  try {
    const user = await UserModel.findOne({email: req.body.email});
   
    if (!user) return res.status(401).json({err: "bad credentials"});
    user.comparePassword(req.body.password, (err, isMatch) => {
      
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: "bad credentials"});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function profile(req, res) {
  try {
    const user = await UserModel.findOne({username: req.params.username})
    if(!user) return res.status(404).json({error: "User not found"})

    const posts = await PostM.find({user: user._id}).populate("user").exec();
    res.status(200).json({data: posts, user: user})
  } catch (err) {
    res.status(400).json({err})
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: "24h"}
  );
}


