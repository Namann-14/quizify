import Link from "next/link"
import { Calendar, Clock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ExamsPage() {
  // Mock data for upcoming exams
  const upcomingExams = [
    {
      id: 1,
      title: "Advanced Mathematics",
      date: "2025-03-15T10:00:00",
      duration: 120,
      description: "Covers advanced calculus, linear algebra, and differential equations",
    },
    {
      id: 2,
      title: "Web Development Fundamentals",
      date: "2025-03-20T14:00:00",
      duration: 90,
      description: "HTML, CSS, JavaScript basics and responsive design principles",
    },
    {
      id: 3,
      title: "Data Structures & Algorithms",
      date: "2025-03-25T09:00:00",
      duration: 150,
      description: "Arrays, linked lists, trees, graphs, sorting and searching algorithms",
    },
  ]

  // Mock data for past exams
  const pastExams = [
    {
      id: 1,
      title: "Introduction to Python",
      date: "2025-03-01T10:00:00",
      score: 92,
      passed: true,
      description: "Python syntax, data types, control structures, and basic libraries",
    },
    {
      id: 2,
      title: "Database Management",
      date: "2025-02-25T14:00:00",
      score: 85,
      passed: true,
      description: "SQL fundamentals, database design, normalization, and query optimization",
    },
    {
      id: 3,
      title: "Network Security",
      date: "2025-02-20T09:00:00",
      score: 68,
      passed: false,
      description: "Encryption, authentication, network protocols, and security best practices",
    },
  ]

  // Mock data for available exams
  const availableExams = [
    {
      id: 1,
      title: "Cloud Computing Fundamentals",
      duration: 120,
      description: "Introduction to cloud services, deployment models, and major providers",
      deadline: "2025-04-30",
    },
    {
      id: 2,
      title: "Mobile App Development",
      duration: 90,
      description: "React Native and Flutter frameworks for cross-platform mobile development",
      deadline: "2025-04-15",
    },
    {
      id: 3,
      title: "Machine Learning Basics",
      duration: 150,
      description: "Supervised and unsupervised learning algorithms and their applications",
      deadline: "2025-05-10",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Exams</h1>
          <p className="text-muted-foreground">View and manage your upcoming, past, and available exams</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search exams..."
              className="w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingExams.length === 0 ? (
            <Card>
              <CardContent className="flex h-[300px] flex-col items-center justify-center">
                <div className="text-center">
                  <h3 className="text-lg font-medium">No upcoming exams</h3>
                  <p className="text-sm text-muted-foreground">You don't have any scheduled exams at the moment.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingExams.map((exam) => (
                <Card key={exam.id}>
                  <CardHeader>
                    <CardTitle>{exam.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{exam.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(exam.date).toLocaleDateString()} at{" "}
                            {new Date(exam.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>Duration: {exam.duration} minutes</span>
                        </div>
                      </div>
                      <Button className="w-full" asChild>
                        <Link href={`/dashboard/exams/${exam.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastExams.length === 0 ? (
            <Card>
              <CardContent className="flex h-[300px] flex-col items-center justify-center">
                <div className="text-center">
                  <h3 className="text-lg font-medium">No past exams</h3>
                  <p className="text-sm text-muted-foreground">You haven't taken any exams yet.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pastExams.map((exam) => (
                <Card key={exam.id}>
                  <CardHeader>
                    <CardTitle>{exam.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{exam.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>{new Date(exam.date).toLocaleDateString()}</span>
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
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1" asChild>
                          <Link href={`/dashboard/exams/${exam.id}/results`}>View Results</Link>
                        </Button>
                        {exam.passed && (
                          <Button className="flex-1" asChild>
                            <Link href={`/dashboard/certificates/${exam.id}`}>Certificate</Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          {availableExams.length === 0 ? (
            <Card>
              <CardContent className="flex h-[300px] flex-col items-center justify-center">
                <div className="text-center">
                  <h3 className="text-lg font-medium">No available exams</h3>
                  <p className="text-sm text-muted-foreground">
                    There are no exams available for you to take at the moment.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {availableExams.map((exam) => (
                <Card key={exam.id}>
                  <CardHeader>
                    <CardTitle>{exam.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{exam.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>Duration: {exam.duration} minutes</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>Available until: {exam.deadline}</span>
                        </div>
                      </div>
                      <Button className="w-full" asChild>
                        <Link href={`/dashboard/exams/${exam.id}/register`}>Register</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

