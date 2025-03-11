import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ExamQuestionsModel from "@/models/question.model.js";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    await connectDB();
    
    // Parse the JSON request
    const data = await request.json();
    
    // Validate exam ID
    if (!data.examId || !mongoose.Types.ObjectId.isValid(data.examId)) {
      return NextResponse.json(
        { success: false, message: "Valid Exam ID is required" },
        { status: 400 }
      );
    }

    // Validate question
    if (!data.text) {
      return NextResponse.json(
        { success: false, message: "Question text is required" },
        { status: 400 }
      );
    }

    // Validate options
    if (!data.options || !Array.isArray(data.options) || data.options.length < 2) {
      return NextResponse.json(
        { success: false, message: "At least two options are required" },
        { status: 400 }
      );
    }

    // Check for at least one correct answer
    const hasCorrectOption = data.options.some(option => option.isCorrect === true);
    if (!hasCorrectOption) {
      return NextResponse.json(
        { success: false, message: "At least one option must be marked as correct" },
        { status: 400 }
      );
    }

    // Format options to ensure they match schema
    const formattedOptions = data.options.map(option => ({
      text: option.text,
      isCorrect: Boolean(option.isCorrect)
    }));

    // Create question object according to schema
    const newQuestion = {
      text: data.text,
      options: formattedOptions
    };

    // Find existing document or create a new one
    const examQuestions = await ExamQuestionsModel.findOneAndUpdate(
      { examId: data.examId },
      { 
        $push: { questions: newQuestion },
        $setOnInsert: { examId: data.examId }
      },
      { 
        upsert: true, 
        new: true,
        runValidators: true
      }
    );

    return NextResponse.json({
      success: true,
      message: "Question added successfully",
      examId: data.examId,
      questionCount: examQuestions.questions.length,
      newQuestion: newQuestion
    }, { status: 201 });

  } catch (error) {
    console.error("Error adding question:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "Something went wrong"
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const examId = searchParams.get('examId');

    if (!examId || !mongoose.Types.ObjectId.isValid(examId)) {
      return NextResponse.json(
        { success: false, message: "Valid Exam ID is required" },
        { status: 400 }
      );
    }

    // Find questions document for the given exam
    const examQuestions = await ExamQuestionsModel.findOne({ examId });

    if (!examQuestions) {
      return NextResponse.json({
        success: true,
        examId: examId,
        count: 0,
        questions: []
      }, { status: 200 });
    }

    return NextResponse.json({
      success: true,
      examId: examId,
      count: examQuestions.questions.length,
      questions: examQuestions.questions
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "Failed to retrieve questions"
    }, { status: 500 });
  }
}