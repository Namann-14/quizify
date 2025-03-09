"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CreateQuestionPage() {
  const [questionType, setQuestionType] = useState("multiple-choice");
  const [options, setOptions] = useState([
    { id: 1, text: "", isCorrect: false },
    { id: 2, text: "", isCorrect: false },
    { id: 3, text: "", isCorrect: false },
    { id: 4, text: "", isCorrect: false },
  ]);

  // Handle option text change
  const handleOptionTextChange = (id, text) => {
    setOptions(
      options.map((option) => (option.id === id ? { ...option, text } : option))
    );
  };

  // Handle correct option selection
  const handleCorrectOptionChange = (id) => {
    setOptions(
      options.map((option) => ({ ...option, isCorrect: option.id === id }))
    );
  };

  // Add new option
  const addOption = () => {
    const newId = Math.max(...options.map((o) => o.id)) + 1;
    setOptions([...options, { id: newId, text: "", isCorrect: false }]);
  };

  // Remove option
  const removeOption = (id) => {
    if (options.length <= 2) return; // Minimum 2 options
    setOptions(options.filter((option) => option.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/question-bank">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create Question</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Question Details</CardTitle>
          <CardDescription>
            Create a new question for your question bank
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="question-text">Question Text</Label>
            <Textarea
              id="question-text"
              placeholder="Enter your question here..."
              className="min-h-[100px]"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="calculus">Calculus</SelectItem>
                  <SelectItem value="algebra">Algebra</SelectItem>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="geography">Geography</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select>
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Question Type</Label>
            <Tabs
              defaultValue="multiple-choice"
              className="w-full"
              onValueChange={setQuestionType}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="multiple-choice">
                  Multiple Choice
                </TabsTrigger>
                <TabsTrigger value="essay">Essay/Subjective</TabsTrigger>
              </TabsList>

              <TabsContent value="multiple-choice" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Answer Options</Label>
                    <Button variant="outline" size="sm" onClick={addOption}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Option
                    </Button>
                  </div>

                  <RadioGroup className="space-y-3">
                    {options.map((option) => (
                      <div key={option.id} className="flex items-center gap-2">
                        <RadioGroupItem
                          value={option.id.toString()}
                          id={`option-${option.id}`}
                          checked={option.isCorrect}
                          onChange={() => handleCorrectOptionChange(option.id)}
                        />
                        <Input
                          placeholder={`Option ${option.id}`}
                          value={option.text}
                          onChange={(e) =>
                            handleOptionTextChange(option.id, e.target.value)
                          }
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeOption(option.id)}
                          disabled={options.length <= 2}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="explanation">Explanation (Optional)</Label>
                  <Textarea
                    id="explanation"
                    placeholder="Explain the correct answer..."
                    className="min-h-[100px]"
                  />
                  <p className="text-sm text-muted-foreground">
                    This will be shown to students after they answer the
                    question.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="essay" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="model-answer">Model Answer (Optional)</Label>
                  <Textarea
                    id="model-answer"
                    placeholder="Enter a model answer for reference..."
                    className="min-h-[200px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grading-rubric">Grading Rubric</Label>
                  <Textarea
                    id="grading-rubric"
                    placeholder="Enter grading criteria..."
                    className="min-h-[100px]"
                  />
                  <p className="text-sm text-muted-foreground">
                    Specify how this question should be graded by examiners.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (Optional)</Label>
            <Input id="tags" placeholder="Enter tags separated by commas" />
            <p className="text-sm text-muted-foreground">
              Tags help organize and find questions more easily.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/dashboard/question-bank">Cancel</Link>
          </Button>
          <Button>Save Question</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
