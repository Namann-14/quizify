import Link from "next/link"
import { Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function CertificatesPage() {
  // Mock certificates data
  const certificates = [
    {
      id: 1,
      examTitle: "Introduction to Python",
      issueDate: "2025-03-01",
      score: 92,
      validUntil: "2027-03-01",
    },
    {
      id: 2,
      examTitle: "Database Management",
      issueDate: "2025-02-25",
      score: 85,
      validUntil: "2027-02-25",
    },
    {
      id: 3,
      examTitle: "Advanced Mathematics",
      issueDate: "2025-03-15",
      score: 85,
      validUntil: "2027-03-15",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Certificates</h1>
          <p className="text-muted-foreground">View and download your earned certificates</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search certificates..."
              className="w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]"
            />
          </div>
        </div>
      </div>

      {certificates.length === 0 ? (
        <Card>
          <CardContent className="flex h-[300px] flex-col items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium">No certificates yet</h3>
              <p className="text-sm text-muted-foreground">Complete and pass exams to earn certificates.</p>
              <Button className="mt-4" asChild>
                <Link href="/dashboard/exams">Browse Exams</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate) => (
            <Card key={certificate.id}>
              <CardHeader className="pb-2">
                <CardTitle>{certificate.examTitle}</CardTitle>
                <CardDescription>Certificate of Completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-[1.414/1] w-full overflow-hidden rounded-md border">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <div className="mb-4 text-xl font-bold">Certificate of Achievement</div>
                    <div className="mb-2">This certifies that</div>
                    <div className="mb-2 text-lg font-medium">John Doe</div>
                    <div className="mb-2">has successfully completed</div>
                    <div className="mb-4 text-lg font-medium">{certificate.examTitle}</div>
                    <div className="mb-2">with a score of {certificate.score}%</div>
                    <div className="mt-4 text-sm text-muted-foreground">
                      Issued on {new Date(certificate.issueDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
              {/* <CardFooter>
                <div className="flex w-full flex-col gap-2 sm:flex-row">
                  <Button className="w-full" asChild>
                    <Link href={`/dashboard/certificates/${certificate.id}`}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/dashboard/certificates/${certificate.id}/verify`}>Verify</Link>
                  </Button>
                </div>
              </CardFooter> */}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

