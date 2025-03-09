import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="px-4 md:px-6">
              <div className="grid gap-2 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4 ">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Secure Online Exams & Instant Certification
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      Our platform enables educational institutions and
                      professional organizations to conduct secure, automated
                      exams with real-time analytics and instant certification.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link href="/register">
                      <Button size="lg" className="w-full">
                        Get Started
                      </Button>
                    </Link>
                    <Link href="/demo">
                      <Button size="lg" variant="outline" className="w-full">
                        Request Demo
                      </Button>
                    </Link>
                  </div>
                </div>
                <Image
                  src="/hero.webp"
                  alt="Secure Online Exams & Instant Certification"
                  width={600}
                  height={400}
                  layout="responsive"
                  className="mt-8 mx-auto"
                />
              </div>
            </div>
          </section>

          <section
            id="features"
            className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
          >
            <div className="px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Platform Features
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Everything you need to conduct secure online exams and
                    provide instant certification
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
                {[
                  {
                    title: "Timed Exams",
                    description:
                      "Set time limits for exams with auto-submission when time expires",
                  },
                  {
                    title: "Randomized Questions",
                    description:
                      "Prevent cheating with randomized question order for each attempt",
                  },
                  {
                    title: "Auto-Grading",
                    description:
                      "Instant evaluation of MCQs and objective questions",
                  },
                  {
                    title: "Performance Analytics",
                    description:
                      "Detailed insights and reports on exam performance",
                  },
                  {
                    title: "Certificate Generation",
                    description:
                      "Automatic PDF certificate generation upon passing exams",
                  },
                  {
                    title: "Secure Environment",
                    description:
                      "Anti-cheating measures including tab-switching detection",
                  },
                ].map((feature, index) => (
                  <Card
                    key={index}
                    className="flex flex-col items-center text-center"
                  >
                    <CardHeader>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
            <div className="px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    How It Works
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our platform simplifies the entire exam process from
                    creation to certification
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-8">
                {[
                  {
                    step: "1",
                    title: "Create Exams",
                    description:
                      "Admins create exams with various question types and set parameters",
                  },
                  {
                    step: "2",
                    title: "Take Exams",
                    description:
                      "Students take secure, timed exams with anti-cheating measures",
                  },
                  {
                    step: "3",
                    title: "Get Certified",
                    description:
                      "Receive instant results, analytics, and downloadable certificates",
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      {step.step}
                    </div>
                    <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                    <p className="mt-2 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="pricing"
            className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
          >
            <div className="px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Pricing Plans
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Choose the plan that fits your organization's needs
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-8">
                {[
                  {
                    title: "Basic",
                    price: "$99",
                    description: "Perfect for small educational institutions",
                    features: [
                      "Up to 100 students",
                      "10 exams per month",
                      "Basic analytics",
                      "Email support",
                    ],
                  },
                  {
                    title: "Professional",
                    price: "$299",
                    description: "Ideal for medium-sized organizations",
                    features: [
                      "Up to 500 students",
                      "Unlimited exams",
                      "Advanced analytics",
                      "Priority support",
                      "Custom certificates",
                    ],
                  },
                  {
                    title: "Enterprise",
                    price: "Custom",
                    description: "For large institutions with specific needs",
                    features: [
                      "Unlimited students",
                      "Unlimited exams",
                      "Custom integrations",
                      "Dedicated support",
                      "White labeling",
                      "API access",
                    ],
                  },
                ].map((plan, index) => (
                  <Card
                    key={index}
                    className={index === 1 ? "border-primary" : ""}
                  >
                    <CardHeader>
                      <CardTitle>{plan.title}</CardTitle>
                      <div className="text-3xl font-bold">{plan.price}</div>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <svg
                              className="mr-2 h-4 w-4 text-primary"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        {index === 2 ? "Contact Sales" : "Get Started"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>
        <footer className="w-full border-t py-6 md:px-40">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2 font-bold">Quizify</div>
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} ExamCert. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
