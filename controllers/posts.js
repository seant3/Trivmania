import Post from '../models/Post.js';
import User from '../models/User.js';

import { v4 as uuidv4 } from "uuid";

export default {
    create,
};

async function create(req, res) {
    console.log(req.user, " <==== req.user", req.body)
    try {
        const post = await Post.create({
            question: req.body.question,
            user: req.user,
            category: req.body.category,
        });
        res.status(201).json({ data: post })
    } catch (err) {
        console.log(err, "error in posts controller - create")  
        res.status(400).json({ err })      
    }
}