import React from "react"
import Link from "next/link"
import { Calendar, Clock, FileText, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ExamDetailsPage({ params }) {
  // Unwrap params using React.use()
  const resolvedParams = React.use(params);
  
  // Mock exam data - in a real app, you would fetch this based on the ID
  const exam = {
    id: Number.parseInt(resolvedParams.id),
    title: "Advanced Mathematics",
    description:
      "This comprehensive exam covers advanced calculus, linear algebra, and differential equations. It is designed to test your understanding of mathematical concepts and problem-solving abilities.",
    date: "2025-03-15T10:00:00",
    duration: 120,
    totalQuestions: 50,
    passingScore: 70,
    topics: [
      "Calculus: Limits, Derivatives, and Integrals",
      "Linear Algebra: Matrices and Vector Spaces",
      "Differential Equations: First and Second Order",
      "Complex Analysis: Complex Numbers and Functions",
      "Numerical Methods: Approximation and Error Analysis",
    ],
    instructions: [
      "Read each question carefully before answering.",
      "You can navigate between questions using the navigation panel.",
      "You can mark questions for review and return to them later.",
      "Once you submit the exam, you cannot return to it.",
      "The exam will automatically submit when the time expires.",
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{exam.title}</h1>
          <p className="text-muted-foreground">Exam ID: {exam.id}</p>
        </div>
        <Button size="lg" asChild>
          <Link href={`/dashboard/exams/${exam.id}/take`}>Start Exam</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Exam Details</CardTitle>
            <CardDescription>Information about the exam</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                  <p>
                    {new Date(exam.date).toLocaleDateString()} at{" "}
                    {new Date(exam.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Duration</p>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                  <p>{exam.duration} minutes</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total Questions</p>
                <div className="flex items-center">
                  <FileText className="mr-1 h-4 w-4 text-muted-foreground" />
                  <p>{exam.totalQuestions} questions</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Passing Score</p>
                <div className="flex items-center">
                  <Info className="mr-1 h-4 w-4 text-muted-foreground" />
                  <p>{exam.passingScore}%</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="font-medium">Description</p>
              <p className="text-sm text-muted-foreground">{exam.description}</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Topics Covered</CardTitle>
              <CardDescription>Key areas that will be tested</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {exam.topics.map((topic, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary" />
                    <span className="text-sm">{topic}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exam Instructions</CardTitle>
              <CardDescription>Please read carefully before starting</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {exam.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 mt-0.5 text-sm font-medium">{index + 1}.</span>
                    <span className="text-sm">{instruction}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={`/dashboard/exams/${exam.id}/take`}>Start Exam</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}