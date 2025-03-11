import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ExamModel from "@/models/exam.model";

export async function GET(request, context) {
  try {
    await connectDB();
    
    // Get the exam ID from the route parameters
    const { id } = await context.params;
    
    if (!id) {
      return NextResponse.json({ 
        success: false, 
        message: "Exam ID is required" 
      }, { status: 400 });
    }
    
    const exam = await ExamModel.findById(id);
    
    if (!exam) {
      return NextResponse.json({ 
        success: false, 
        message: "Exam not found" 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Exam fetched successfully", 
      exam 
    }, { status: 200 });
    
  } catch (error) {
    console.error("Error fetching exam:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Failed to fetch exam", 
      error: error.message 
    }, { status: 500 });
  }
}