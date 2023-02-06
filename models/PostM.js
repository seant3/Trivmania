import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId }
})

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectID, ref: 'User'},
    question: String,
    correctAnswer: String,
    incorrectAnswer1: String,
    incorrectAnswer2: String,
    incorrectAnswer3: String,
    likes: [likeSchema],
})

export default mongoose.model('PostM', postSchema);