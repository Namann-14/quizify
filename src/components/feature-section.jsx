'use client';
import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { motion } from "framer-motion";

export function FeatureSection() {
  // Animation variants for container with staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Each card animates 0.1s after the previous
        delayChildren: 0.3,   // Delay before first card animates
      }
    }
  };

  // Animation variants for individual cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.5
      }
    }
  };

  return (
    <BackgroundBeamsWithCollision>
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2
              className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
              Platform{" "}
              <div
                className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                <div
                  className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                  <span className="">Features</span>
                </div>
                <div
                  className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                  <span className="">Features</span>
                </div>
              </div>
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed relative z-20">
              Everything you need to conduct secure online exams and
              provide instant certification
            </p>
          </div>
          <motion.div 
            className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8 relative z-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
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
              <motion.div
                key={index}
                variants={cardVariants}
                className="flex"
              >
                <Card className="flex flex-col items-center text-center w-full">
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </BackgroundBeamsWithCollision>
  );
}