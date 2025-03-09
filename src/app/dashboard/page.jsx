"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, BadgeIcon as Certificate, Clock, FileText, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "@/components/ui/chart"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for charts
  const barData = [
    { name: "Math", score: 85 },
    { name: "Science", score: 92 },
    { name: "History", score: 78 },
    { name: "English", score: 88 },
    { name: "Programming", score: 95 },
  ]

  const lineData = [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 72 },
    { month: "Mar", score: 78 },
    { month: "Apr", score: 82 },
    { month: "May", score: 85 },
    { month: "Jun", score: 90 },
  ]

  const pieData = [
    { name: "Passed", value: 12 },
    { name: "Failed", value: 3 },
  ]

  const COLORS = ["#4f46e5", "#f43f5e"]

  // Mock data for upcoming exams
  const upcomingExams = [
    {
      id: 1,
      title: "Advanced Mathematics",
      date: "2025-03-15T10:00:00",
      duration: 120,
    },
    {
      id: 2,
      title: "Web Development Fundamentals",
      date: "2025-03-20T14:00:00",
      duration: 90,
    },
    {
      id: 3,
      title: "Data Structures & Algorithms",
      date: "2025-03-25T09:00:00",
      duration: 150,
    },
  ]

  // Mock data for recent exams
  const recentExams = [
    {
      id: 1,
      title: "Introduction to Python",
      date: "2025-03-01T10:00:00",
      score: 92,
      passed: true,
    },
    {
      id: 2,
      title: "Database Management",
      date: "2025-02-25T14:00:00",
      score: 85,
      passed: true,
    },
    {
      id: 3,
      title: "Network Security",
      date: "2025-02-20T09:00:00",
      score: 68,
      passed: false,
    },
  ]

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your exam performance and upcoming tests.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Passed Exams</CardTitle>
            <Certificate className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">80% success rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next: Mar 15, 2025</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Exams</TabsTrigger>
          <TabsTrigger value="recent">Recent Exams</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Your exam scores across different subjects</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Exam Results</CardTitle>
                <CardDescription>Pass/Fail distribution</CardDescription>
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
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Progress Over Time</CardTitle>
                <CardDescription>Your average score trend over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Exams</CardTitle>
                <CardDescription>Your next scheduled exams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingExams.slice(0, 2).map((exam) => (
                    <div key={exam.id} className="flex items-center">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{exam.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(exam.date).toLocaleDateString()} at{" "}
                          {new Date(exam.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{exam.duration} min</span>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/dashboard/exams">View All Exams</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Detailed analysis of your exam performance</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Progress Over Time</CardTitle>
                <CardDescription>Your score trend over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exam Results Distribution</CardTitle>
                <CardDescription>Pass/Fail ratio of your exams</CardDescription>
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
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Exams</CardTitle>
              <CardDescription>Your scheduled exams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {upcomingExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{exam.title}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        {new Date(exam.date).toLocaleDateString()} at{" "}
                        {new Date(exam.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        Duration: {exam.duration} minutes
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" asChild>
                        <Link href={`/dashboard/exams/${exam.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Exams</CardTitle>
              <CardDescription>Your completed exams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{exam.title}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        {new Date(exam.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            exam.passed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {exam.passed ? "Passed" : "Failed"}
                        </span>
                        <span className="ml-2 text-sm">Score: {exam.score}%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/dashboard/exams/${exam.id}/results`}>View Results</Link>
                      </Button>
                      {exam.passed && (
                        <Button size="sm" asChild>
                          <Link href={`/dashboard/certificates/${exam.id}`}>View Certificate</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

