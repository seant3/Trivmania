import Post from '../models/Post.js';
import User from '../models/User.js';

export default {
    create,
    index
};

async function create(req, res) {
    console.log(req.user, " <==== req.user in Posts Controller", req.body)
    try {
        const post = await Post.create({
            question: req.body.question,
            user: req.user._id,
        });
        await post.populate('user')
        res.status(201).json({ post })
    } catch (err) {
        console.log(err, "error in posts controller - create")  
        res.status(400).json({ err })      
    }
}

async function index(req, res) {
    try {
        const posts = await Post.find({}).populate("user").exec();
        res.status(200).json({ data: posts });
    } catch (err) {
        res.status(400).json({ err });
    }
}