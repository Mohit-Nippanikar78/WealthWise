import React, { useState } from "react";
import {
  BookOpen,
  GraduationCap,
  TrendingUp,
  Shield,
  Brain,
  PlayCircle,
} from "lucide-react";

const videos = {
  Beginner: [
    {
      videolink: "https://www.youtube.com/watch?v=p3OUFMpT7B0",
      title: "How to Invest For Beginners (2023 Step-by-Step Guide)",
      description:
        "A comprehensive guide for beginners on how to start investing in 2023, covering various investment strategies and tips.",
      duration: "45 min",
      modules: 1,
      progress: 0,
    },
    {
      videolink: "https://www.youtube.com/watch?v=ZCFkWDdmXG8",
      title: "Understanding the Stock Market for Beginners",
      description:
        "An easy-to-understand explanation of how the stock market works, tailored for those new to investing.",
      duration: "30 min",
      modules: 1,
      progress: 0,
    },
  ],
  Intermediate: [
    {
      videolink: "https://www.youtube.com/watch?v=gFQNPmLKj1k",
      title: "5 Ways to Save Money Fast - Financial Hacks",
      description:
        "Learn five effective strategies to save money quickly and improve your financial situation with practical tips.",
      duration: "25 min",
      modules: 1,
      progress: 0,
    },
    {
      videolink: "https://www.youtube.com/watch?v=M3r2XDceM6A",
      title: "Investment Strategies and Portfolio Management",
      description:
        "Learn about different investment strategies and how to manage your portfolio effectively.",
      duration: "35 min",
      modules: 1,
      progress: 0,
    },
  ],
  Advanced: [
    {
      videolink: "https://www.youtube.com/watch?v=WEDIj9JBTC8",
      title: "Advanced Stock Trading Strategies",
      description:
        "Discover advanced trading strategies and techniques for experienced investors.",
      duration: "40 min",
      modules: 1,
      progress: 0,
    },
  ],
};

const courses = [
  {
    level: "Beginner",
    icon: BookOpen,
    courses: [
      {
        title: "Introduction to Investing",
        description: "Learn the basics of investing and financial markets",
        duration: "2 hours",
        modules: 5,
        progress: 80,
      },
      {
        title: "Understanding Stocks",
        description: "Master the fundamentals of stock market investing",
        duration: "3 hours",
        modules: 8,
        progress: 60,
      },
    ],
  },
  {
    level: "Intermediate",
    icon: TrendingUp,
    courses: [
      {
        title: "Technical Analysis",
        description: "Learn to analyze market trends and patterns",
        duration: "4 hours",
        modules: 10,
        progress: 30,
      },
      {
        title: "Portfolio Management",
        description: "Master the art of building and managing investments",
        duration: "3 hours",
        modules: 6,
        progress: 0,
      },
    ],
  },
  {
    level: "Advanced",
    icon: Brain,
    courses: [
      {
        title: "AI in Trading",
        description: "Explore how AI is revolutionizing trading",
        duration: "5 hours",
        modules: 12,
        progress: 0,
      },
      {
        title: "Risk Management",
        description: "Advanced strategies for managing investment risks",
        duration: "4 hours",
        modules: 8,
        progress: 0,
      },
    ],
  },
];

const Learn = () => {
  const [selectedLevel, setSelectedLevel] = useState("Beginner");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const getVideoId = (url: string) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Learning Center
          </h1>
          <button className="btn-primary">
            <GraduationCap className="h-5 w-5 mr-2" />
            Track Progress
          </button>
        </div>

        {/* Video Player */}
        {selectedVideo && (
          <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${getVideoId(
                  selectedVideo
                )}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-lg"
              ></iframe>
            </div>
            <button
              onClick={() => setSelectedVideo(null)}
              className="mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
            >
              Close Video
            </button>
          </div>
        )}

        {/* Level Selection */}
        <div className="flex space-x-4 mb-8">
          {courses.map(({ level, icon: Icon }) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`flex-1 p-4 rounded-lg border ${
                selectedLevel === level
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              }`}
            >
              <div className="flex items-center justify-center">
                <Icon
                  className={`h-6 w-6 ${
                    selectedLevel === level
                      ? "text-indigo-500"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                />
                <span
                  className={`ml-2 font-medium ${
                    selectedLevel === level
                      ? "text-indigo-700 dark:text-indigo-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {level}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Course and Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Regular Courses */}
          {courses
            .find((c) => c.level === selectedLevel)
            ?.courses.map((course, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {course.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {course.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Shield className="h-4 w-4" />
                    <span>{course.modules} modules</span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Progress
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <button className="btn-secondary">
                    {course.progress > 0 ? "Continue" : "Start Course"}
                  </button>
                </div>
              </div>
            ))}

          {/* Video Courses */}
          {videos[selectedLevel as keyof typeof videos]?.map((video, index) => (
            <div
              key={`video-${index}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <div className="flex items-start space-x-4">
                <button
                  onClick={() => setSelectedVideo(video.videolink)}
                  className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg p-3"
                >
                  <PlayCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </button>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {video.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {video.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>{video.duration}</span>
                    </div>
                    <button
                      onClick={() => setSelectedVideo(video.videolink)}
                      className="btn-secondary"
                    >
                      Watch Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Path */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Your Learning Path
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="relative">
              {[
                "Complete Beginner Courses",
                "Start Technical Analysis",
                "Master Portfolio Management",
                "Explore Advanced Topics",
              ].map((step, index) => (
                <div key={index} className="flex items-start mb-8 last:mb-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-medium text-sm">
                    {index + 1}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {step}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {index === 0 ? "In Progress" : "Upcoming"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
