"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function CertificatePage({ params }) {
  const certificateRef = useRef(null);

  // Mock certificate data
  const certificate = {
    id: Number.parseInt(params.id),
    examTitle: "Advanced Mathematics",
    issueDate: "2025-03-15",
    score: 85,
    validUntil: "2027-03-15",
    certificateNumber: "CERT-2025-" + params.id.padStart(6, "0"),
    recipientName: "John Doe",
    issuerName: "ExamCert Academy",
    issuerLogo: "/placeholder.svg?height=80&width=80",
  };

  // Handle certificate download
  const handleDownload = () => {
    // In a real app, you would use a library like html2canvas or jsPDF
    // to generate a PDF or image of the certificate
    alert("Certificate download functionality would be implemented here");
  };

  // Handle certificate sharing
  const handleShare = () => {
    // In a real app, you would implement sharing functionality
    // This could be via email, social media, or generating a shareable link
    alert("Certificate sharing functionality would be implemented here");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/certificates">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Certificate</h1>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Certificate Details</CardTitle>
              <CardDescription>Information about your certificate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Certificate Number</p>
                  <p>{certificate.certificateNumber}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Issue Date</p>
                  <p>{new Date(certificate.issueDate).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Valid Until</p>
                  <p>{new Date(certificate.validUntil).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Score</p>
                  <p>{certificate.score}%</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Recipient</p>
                <p>{certificate.recipientName}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Exam</p>
                <p>{certificate.examTitle}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Issuer</p>
                <p>{certificate.issuerName}</p>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button className="flex-1" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleShare}>
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="flex-1">
          <div className="sticky top-20">
            <div ref={certificateRef} className="relative overflow-hidden rounded-lg border bg-white p-8 shadow-sm">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center opacity-5"></div>

              <div className="relative flex flex-col items-center text-center">
                <img src={certificate.issuerLogo || "/placeholder.svg"} alt="Issuer Logo" className="mb-4 h-20 w-20" />

                <h2 className="mb-1 text-2xl font-bold text-gray-900">Certificate of Achievement</h2>
                <p className="mb-6 text-sm text-gray-600">This certifies that</p>

                <h3 className="mb-6 text-3xl font-bold text-gray-900">{certificate.recipientName}</h3>

                <p className="mb-2 text-sm text-gray-600">has successfully completed</p>
                <h4 className="mb-6 text-xl font-bold text-gray-900">{certificate.examTitle}</h4>

                <p className="mb-6 text-sm text-gray-600">with a score of {certificate.score}%</p>

                <div className="mb-6 h-px w-3/4 bg-gray-200"></div>

                <div className="flex w-full justify-between">
                  <div className="text-left">
                    <p className="text-xs text-gray-600">Issue Date</p>
                    <p className="text-sm font-medium">{new Date(certificate.issueDate).toLocaleDateString()}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-gray-600">Certificate ID</p>
                    <p className="text-sm font-medium">{certificate.certificateNumber}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-600">Valid Until</p>
                    <p className="text-sm font-medium">{new Date(certificate.validUntil).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-sm font-medium">{certificate.issuerName}</p>
                  <p className="text-xs text-gray-600">Authorized Issuer</p>
                </div>

                <div className="mt-4 rounded-md bg-gray-100 px-4 py-2 text-xs text-gray-600">
                  Verify this certificate at: examcert.com/verify/{certificate.certificateNumber}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}