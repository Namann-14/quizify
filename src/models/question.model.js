import mongoose from "mongoose";

// Define the option schema
const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Option text is required"],
    trim: true,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
});

// Define the question schema (this will be embedded)
const questionItemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Question text is required"],
    trim: true,
  },
  options: [optionSchema]
});

// Main schema that will store all questions for a single exam
const examQuestionsSchema = new mongoose.Schema(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: [true, "Exam ID is required"],
      // Remove unique constraint to allow multiple questions per exam
    },
    questionText: {
      type: String,
      required: [true, "Question text is required"],
      trim: true,
    },
    options: [optionSchema],
  },
  { timestamps: true }
);

// Only define the index once - remove duplicate index definition
// No need for unique constraint
examQuestionsSchema.index({ examId: 1 });

const ExamQuestionsModel =
  mongoose.models.ExamQuestions ||
  mongoose.model("ExamQuestions", examQuestionsSchema);

export default ExamQuestionsModel;