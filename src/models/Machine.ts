import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  caloriesBurned: {
    type: Number,
    required: true,
  },
});

const Excercise = mongoose.model("Exercise", exerciseSchema);