import User from "../models/User.js"
import Post from '../models/Post.js'
import jwt from "jsonwebtoken"
const SECRET = process.env.SECRET;

export default {
  signup,
  login,
  profile
};


async function signup(req, res) {
  console.log("hitting signup router")
  console.log(req.body)
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

async function login(req, res) {
 
  try {
    const user = await User.findOne({email: req.body.email});
   
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
    const user = await User.findOne({username: req.params.username})
    if(!user) return res.status(404).json({error: "User not found"})

    const posts = await Post.find({user: user._id}).populate("user").exec();
    console.log(posts, ' this is posts in Users Controller Profile')
    res.status(200).json({data: posts, user: user})
  } catch (err) {
    console.log(err, "error in the Users Control Profile function")
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


