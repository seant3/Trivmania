import Score from '../models/Score.js';

export default {
    create,
    index
};

async function create(req, res) {
    
    try {
        const post = await Score.create({
            score: req.body.data.points,
            category: req.body.data.category,
            difficulty: req.body.data.difficulty,
            question: req.body.data.question,
            user: req.user._id,
        });
        await post.populate('user')
        res.status(201).json({ post })
    } catch (err) {
        res.status(400).json({ err })      
    }
}

async function index(req, res) {
    try {
        const posts = await Score.find({}).populate("user").exec();
        res.status(200).json({ data: posts });
    } catch (err) {
        res.status(400).json({ err });
    }
}