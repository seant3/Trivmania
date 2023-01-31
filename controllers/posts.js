import Post from '../models/Post.js';
import User from '../models/User.js';

import { v4 as uuidv4 } from "uuid";

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
            category: req.body.category,
        });
        await post.populate('user')
        res.status(201).json({ data: post })
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