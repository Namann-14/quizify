"use client";
import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "./ui/tracing-beam";

export function TracingBeamDemo() {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-4xl mx-auto antialiased pt-4 ml-10 relative">
        {dummyContent.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </h2>

            <p className={twMerge("text-xl mb-4")}>{item.title}</p>

            <div className="text-sm prose prose-sm dark:prose-invert">
              {item?.image && (
                <Image
                  src={item.image}
                  alt="blog thumbnail"
                  height="1000"
                  width="1000"
                  className="rounded-lg mb-10 object-cover"
                />
              )}
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}

// ...existing code...

const dummyContent = [
  {
    title: "Professional Certifications to Advance Your Career",
    description: (
      <>
        <p>
          Quizify offers industry-recognized certifications that help professionals validate their skills and knowledge. Our comprehensive testing platform is designed with both candidates and employers in mind, ensuring that each certification represents a meaningful qualification in today's competitive job market. With detailed performance analytics and personalized learning paths, we help you identify improvement areas and focus your study efforts effectively.
        </p>
        <p>
          Our certification programs cover various fields including software development, data science, cybersecurity, project management, and digital marketing. Each program is developed in collaboration with industry experts to ensure relevance and accuracy. Certifications are regularly updated to reflect the latest industry standards and technologies.
        </p>
        <p>
          Whether you're looking to advance in your current role or transition to a new career path, Quizify's certifications provide the credibility and validation you need to stand out to potential employers.
        </p>
      </>
    ),
    badge: "Certifications",
    image:
      "https://images.unsplash.com/photo-1546422904-90eab23c3d7e?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3",
  },
  {
    title: "Adaptive Testing Technology",
    description: (
      <>
        <p>
          Our platform utilizes advanced adaptive testing algorithms that adjust question difficulty based on your performance, providing a more accurate assessment of your knowledge and skills. This technology ensures that each test is uniquely tailored to challenge you appropriately, making the certification process both efficient and thorough.
        </p>
        <p>
          Quizify's secure testing environment maintains the integrity of all certifications by implementing AI-powered proctoring, randomized question banks, and time-limited sessions. Employers can trust that our credentials represent verified expertise, and candidates can showcase their skills with confidence.
        </p>
      </>
    ),
    badge: "Technology",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3",
  },
  {
    title: "Practice Tests & Learning Resources",
    description: (
      <>
        <p>
          Prepare for your certification with our comprehensive library of practice tests, study guides, and interactive learning materials. Our practice exams mirror the format and difficulty of actual certification tests, helping you build confidence and familiarity with the testing environment. Performance analytics highlight your strengths and weaknesses, allowing you to focus your study time efficiently and maximize your chances of success.
        </p>
      </>
    ),
    badge: "Resources",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3",
  },
];

// ...existing code...