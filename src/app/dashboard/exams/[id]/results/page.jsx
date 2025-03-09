"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "@/components/ui/chart";

export default function ExamResultsPage({ params }) {
  const [activeTab, setActiveTab] = useState("summary");

  // Mock exam result data
  const examResult = {
    id: Number.parseInt(params.id),
    title: "Advanced Mathematics",
    date: "2025-03-15T10:00:00",
    duration: 120,
    score: 85,
    passingScore: 70,
    totalQuestions: 50,
    correctAnswers: 42,
    incorrectAnswers: 8,
    skippedQuestions: 0,
    timeTaken: 105, // minutes
    passed: true,
    categoryScores: [
      { name: "Calculus", score: 90 },
      { name: "Linear Algebra", score: 80 },
      { name: "Differential Equations", score: 85 },
      { name: "Complex Analysis", score: 75 },
      { name: "Numerical Methods", score: 95 },
    ],
    questions: Array.from({ length: 10 }, (_, i) => ({
      id: i,
      text: `Question ${i + 1}: Solve the following mathematical problem.`,
      userAnswer: i < 8 ? `${i}-a` : `${i}-c`,
      correctAnswer: i < 8 ? `${i}-a` : `${i}-b`,
      isCorrect: i < 8,
      explanation:
        "The correct approach is to apply the chain rule for differentiation and then solve for the variable.",
    })),
  };

  // Calculate percentages
  const correctPercentage = (examResult.correctAnswers / examResult.totalQuestions) * 100;
  const incorrectPercentage = (examResult.incorrectAnswers / examResult.totalQuestions) * 100;
  const skippedPercentage = (examResult.skippedQuestions / examResult.totalQuestions) * 100;

  // Data for pie chart
  const pieData = [
    { name: "Correct", value: examResult.correctAnswers },
    { name: "Incorrect", value: examResult.incorrectAnswers },
    { name: "Skipped", value: examResult.skippedQuestions },
  ];

  const COLORS = ["#10b981", "#ef4444", "#f59e0b"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Exam Results</h1>
          <p className="text-muted-foreground">
            {examResult.title} - {new Date(examResult.date).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/exams">Back to Exams</Link>
          </Button>
          {examResult.passed && (
            <Button asChild>
              <Link href={`/dashboard/certificates/${examResult.id}`}>
                <Download className="mr-2 h-4 w-4" />
                Certificate
              </Link>
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Result Summary</CardTitle>
          <CardDescription>
            {examResult.passed ? "Congratulations! You passed the exam." : "Unfortunately, you did not pass the exam."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Score: {examResult.score}%</span>
              <span className="text-sm font-medium">Passing Score: {examResult.passingScore}%</span>
            </div>
            <Progress value={examResult.score} className="h-2" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Questions</p>
              <p className="text-2xl font-bold">{examResult.totalQuestions}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Correct Answers</p>
              <p className="text-2xl font-bold text-green-600">{examResult.correctAnswers}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Incorrect Answers</p>
              <p className="text-2xl font-bold text-red-600">{examResult.incorrectAnswers}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Time Taken</p>
              <p className="text-2xl font-bold">{examResult.timeTaken} min</p>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Final Result</p>
                <p className="text-sm text-muted-foreground">Based on the passing criteria</p>
              </div>
              <div
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  examResult.passed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {examResult.passed ? "PASSED" : "FAILED"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="summary" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="summary">Performance Summary</TabsTrigger>
          <TabsTrigger value="questions">Question Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
                <CardDescription>Breakdown of your answers</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
                <CardDescription>Your scores by topic</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={examResult.categoryScores}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
              <CardDescription>Analysis of your exam performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Strengths</h3>
                <ul className="list-disc pl-5 text-sm">
                  <li>Excellent performance in Numerical Methods (95%)</li>
                  <li>Strong understanding of Calculus concepts (90%)</li>
                  <li>Good time management - completed the exam in 105 minutes (out of 120)</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Areas for Improvement</h3>
                <ul className="list-disc pl-5 text-sm">
                  <li>Complex Analysis needs more attention (75%)</li>
                  <li>Review Linear Algebra concepts (80%)</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Recommendations</h3>
                <ul className="list-disc pl-5 text-sm">
                  <li>Focus on strengthening Complex Analysis understanding</li>
                  <li>Practice more Linear Algebra problems</li>
                  <li>Consider taking advanced courses in Numerical Methods</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Question Analysis</CardTitle>
              <CardDescription>Detailed breakdown of your answers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {examResult.questions.map((question) => (
                  <div key={question.id} className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div
                        className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full ${
                          question.isCorrect ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        {question.isCorrect ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <X className="h-3 w-3 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{question.text}</p>
                        <div className="mt-2 space-y-1 text-sm">
                          <p>
                            <span className="font-medium">Your Answer:</span>{" "}
                            <span className={question.isCorrect ? "text-green-600" : "text-red-600"}>
                              {question.userAnswer.split("-")[1].toUpperCase()}
                            </span>
                          </p>
                          {!question.isCorrect && (
                            <p>
                              <span className="font-medium">Correct Answer:</span>{" "}
                              <span className="text-green-600">
                                {question.correctAnswer.split("-")[1].toUpperCase()}
                              </span>
                            </p>
                          )}
                        </div>
                        {!question.isCorrect && (
                          <div className="mt-2 rounded-md bg-muted p-2 text-sm">
                            <p className="font-medium">Explanation:</p>
                            <p className="text-muted-foreground">{question.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}