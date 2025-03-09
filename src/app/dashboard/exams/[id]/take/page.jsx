"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, ArrowRight, Clock, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function TakeExamPage({ params }) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedQuestions, setMarkedQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(120 * 60); // 120 minutes in seconds
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isTimeWarningVisible, setIsTimeWarningVisible] = useState(false);
  const [isTabSwitchWarningVisible, setIsTabSwitchWarningVisible] = useState(false);

  // Mock exam data
  const exam = {
    id: Number.parseInt(params.id),
    title: "Advanced Mathematics",
    totalQuestions: 10,
    questions: Array.from({ length: 10 }, (_, i) => ({
      id: i,
      text: `Question ${i + 1}: Solve the following mathematical problem.`,
      options: [
        { id: `${i}-a`, text: "Option A" },
        { id: `${i}-b`, text: "Option B" },
        { id: `${i}-c`, text: "Option C" },
        { id: `${i}-d`, text: "Option D" },
      ],
    })),
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Handle timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }

        // Show warning when 5 minutes remaining
        if (prev === 300) {
          setIsTimeWarningVisible(true);
          setTimeout(() => setIsTimeWarningVisible(false), 10000);
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle tab visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setIsTabSwitchWarningVisible(true);
        setTimeout(() => setIsTabSwitchWarningVisible(false), 5000);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Disable right-click
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  // Handle answer selection
  const handleAnswerSelect = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: value,
    }));
  };

  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestion < exam.totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Navigate to previous question
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Toggle mark question for review
  const handleMarkQuestion = () => {
    if (markedQuestions.includes(currentQuestion)) {
      setMarkedQuestions(markedQuestions.filter((q) => q !== currentQuestion));
    } else {
      setMarkedQuestions([...markedQuestions, currentQuestion]);
    }
  };

  // Navigate to specific question
  const handleQuestionClick = (index) => {
    setCurrentQuestion(index);
  };

  // Submit exam
  const handleSubmitExam = () => {
    // In a real app, you would send the answers to the server
    router.push(`/dashboard/exams/${params.id}/results`);
  };

  // Calculate progress
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / exam.totalQuestions) * 100;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Header with timer and progress */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background p-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">{exam.title}</h1>
          <div className="hidden md:block">
            <Progress value={progress} className="h-2 w-[200px]" />
            <p className="text-xs text-muted-foreground">
              {answeredQuestions} of {exam.totalQuestions} questions answered
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className={`font-mono ${timeLeft < 300 ? "text-red-500 font-bold" : ""}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <Button onClick={() => setIsSubmitDialogOpen(true)}>Submit Exam</Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Question navigation sidebar */}
        <div className="border-b md:w-64 md:border-r md:border-b-0">
          <div className="p-4">
            <h2 className="mb-2 font-medium">Questions</h2>
            <div className="grid grid-cols-5 gap-2 md:grid-cols-3">
              {exam.questions.map((_, index) => (
                <Button
                  key={index}
                  variant={currentQuestion === index ? "default" : answers[index] ? "outline" : "ghost"}
                  size="sm"
                  className={`relative ${markedQuestions.includes(index) ? "ring-2 ring-yellow-500" : ""}`}
                  onClick={() => handleQuestionClick(index)}
                >
                  {index + 1}
                  {markedQuestions.includes(index) && (
                    <Flag className="absolute -right-1 -top-1 h-3 w-3 text-yellow-500" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Question and answer area */}
        <div className="flex-1 p-4">
          {isTimeWarningVisible && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Time Warning</AlertTitle>
              <AlertDescription>You have 5 minutes remaining. Please finish your exam.</AlertDescription>
            </Alert>
          )}

          {isTabSwitchWarningVisible && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Tab switching detected. This activity is logged and may be considered cheating.
              </AlertDescription>
            </Alert>
          )}

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Question {currentQuestion + 1}</CardTitle>
              <CardDescription>{markedQuestions.includes(currentQuestion) ? "Marked for review" : ""}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{exam.questions[currentQuestion].text}</p>
              <RadioGroup value={answers[currentQuestion] || ""} onValueChange={handleAnswerSelect}>
                {exam.questions[currentQuestion].options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id}>{option.text}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" onClick={handlePrevQuestion} disabled={currentQuestion === 0}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNextQuestion}
                  disabled={currentQuestion === exam.totalQuestions - 1}
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <Button
                variant={markedQuestions.includes(currentQuestion) ? "default" : "outline"}
                onClick={handleMarkQuestion}
              >
                <Flag className="mr-2 h-4 w-4" />
                {markedQuestions.includes(currentQuestion) ? "Unmark" : "Mark for Review"}
              </Button>
            </CardFooter>
          </Card>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              className="md:hidden"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button
              variant="outline"
              onClick={handleNextQuestion}
              disabled={currentQuestion === exam.totalQuestions - 1}
              className="md:hidden"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Submit confirmation dialog */}
      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Exam</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your exam? You cannot return to the exam after submission.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-2 text-sm font-medium">Exam Summary:</p>
            <ul className="space-y-1 text-sm">
              <li>Total Questions: {exam.totalQuestions}</li>
              <li>Answered: {answeredQuestions}</li>
              <li>Unanswered: {exam.totalQuestions - answeredQuestions}</li>
              <li>Marked for Review: {markedQuestions.length}</li>
            </ul>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitExam}>Submit Exam</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}