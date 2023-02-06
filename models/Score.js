import mongoose from "mongoose";

const scoreSchema = mongoose.Schema({
  score: { Number, min: 0 },
  category: String,
  difficulty: String,
  userId: { type: mongoose.Schema.Types.ObjectId },
});

export default mongoose.model("Score", postSchema);
