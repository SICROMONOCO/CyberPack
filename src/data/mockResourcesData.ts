
export const mockResourcesData = {
  branches: [
    {
      id: "cybersecurity",
      name: "Cybersecurity Branch",
      description: "Comprehensive cybersecurity education covering all aspects of digital security",
      brochure: {
        title: "Cybersecurity Program Brochure 2024",
        filename: "cybersecurity-brochure-2024.pdf",
        size: "2.3 MB",
        lastUpdated: "2024-01-15"
      },
      semesters: [
        {
          id: "sem1",
          name: "Semester 1",
          subjects: [
            {
              id: "acc-mgmt-1",
              title: "Accounting & Management I",
              description: "Fundamental principles of accounting and basic management concepts. Students will learn financial statement preparation, cost accounting basics, and introduction to management theory.",
              tag: "Disciplinary",
              creditHours: 3,
              code: "ACC101",
              prerequisites: [],
              instructor: "Dr. Sarah Johnson",
              resources: [
                {
                  id: "res1",
                  title: "Financial Accounting Fundamentals",
                  description: "Comprehensive guide to financial accounting principles and practices for beginners.",
                  type: "pdf",
                  dateAdded: "2024-01-10T10:00:00Z",
                  author: "Dr. Sarah Johnson",
                  keywords: ["accounting", "fundamentals", "financial statements"],
                  language: "English"
                },
                {
                  id: "res2",
                  title: "Management Theory Video Lectures",
                  description: "Series of video lectures covering basic management theory and organizational behavior.",
                  type: "video",
                  url: "https://example.com/video",
                  dateAdded: "2024-01-08T14:30:00Z",
                  author: "Prof. Management Institute",
                  keywords: ["management", "theory", "lectures"],
                  language: "English"
                }
              ]
            },
            {
              id: "algo-prog-1",
              title: "Algorithm & Programming I",
              description: "Introduction to programming fundamentals using Python. Covers basic algorithms, data structures, and problem-solving techniques essential for cybersecurity professionals.",
              tag: "Core",
              creditHours: 4,
              code: "CS101",
              prerequisites: [],
              instructor: "Prof. Michael Chen",
              resources: [
                {
                  id: "res3",
                  title: "Python Programming Handbook",
                  description: "Complete reference guide for Python programming with examples and exercises.",
                  type: "pdf",
                  dateAdded: "2024-01-12T09:15:00Z",
                  author: "Prof. Michael Chen",
                  keywords: ["python", "programming", "algorithms"],
                  language: "English"
                },
                {
                  id: "res4",
                  title: "Data Structures Visualization Tool",
                  description: "Interactive online tool for visualizing different data structures and algorithms.",
                  type: "link",
                  url: "https://visualgo.net",
                  dateAdded: "2024-01-05T16:45:00Z",
                  author: "VisuAlgo Team",
                  keywords: ["data structures", "visualization", "interactive"],
                  language: "English"
                },
                {
                  id: "res5",
                  title: "Programming Exercise Solutions",
                  description: "Solutions to all programming exercises from the course textbook.",
                  type: "document",
                  dateAdded: "2024-01-15T11:20:00Z",
                  author: "Prof. Michael Chen",
                  keywords: ["exercises", "solutions", "programming"],
                  language: "English"
                }
              ]
            },
            {
              id: "calc-1",
              title: "Calculus I",
              description: "Differential and integral calculus with applications in computer science and cybersecurity. Focus on mathematical foundations required for advanced coursework.",
              tag: "Disciplinary",
              creditHours: 3,
              code: "MATH101",
              prerequisites: [],
              instructor: "Dr. Emily Rodriguez",
              resources: [
                {
                  id: "res6",
                  title: "Calculus Formula Reference Sheet",
                  description: "Quick reference sheet with all essential calculus formulas and identities.",
                  type: "pdf",
                  dateAdded: "2024-01-07T13:00:00Z",
                  author: "Dr. Emily Rodriguez",
                  keywords: ["calculus", "formulas", "reference"],
                  language: "English"
                }
              ]
            }
          ]
        },
        {
          id: "sem2",
          name: "Semester 2",
          subjects: [
            {
              id: "network-sec-fund",
              title: "Network Security Fundamentals",
              description: "Core concepts of network security including cryptography basics, secure protocols, network threats, and defensive mechanisms. Hands-on labs with real-world scenarios.",
              tag: "Core",
              creditHours: 4,
              code: "CYB201",
              prerequisites: ["CS101"],
              instructor: "Dr. Alex Thompson",
              resources: [
                {
                  id: "res7",
                  title: "Network Security Essentials",
                  description: "Comprehensive textbook covering network security fundamentals and best practices.",
                  type: "pdf",
                  dateAdded: "2024-01-20T10:30:00Z",
                  author: "Dr. Alex Thompson",
                  keywords: ["network security", "cryptography", "protocols"],
                  language: "English"
                },
                {
                  id: "res8",
                  title: "Cryptography Lab Exercises",
                  description: "Hands-on laboratory exercises for understanding cryptographic algorithms and implementations.",
                  type: "document",
                  dateAdded: "2024-01-18T15:45:00Z",
                  author: "Dr. Alex Thompson",
                  keywords: ["cryptography", "labs", "exercises"],
                  language: "English"
                },
                {
                  id: "res9",
                  title: "Network Analysis Tools Demo",
                  description: "Video demonstration of popular network analysis and security testing tools.",
                  type: "video",
                  url: "https://example.com/network-demo",
                  dateAdded: "2024-01-22T12:00:00Z",
                  author: "CyberSec Academy",
                  keywords: ["network analysis", "tools", "demonstration"],
                  language: "English"
                }
              ]
            },
            {
              id: "data-structures",
              title: "Data Structures & Algorithms II",
              description: "Advanced data structures and algorithm analysis. Implementation of trees, graphs, hash tables, and their applications in cybersecurity contexts.",
              tag: "Core",
              creditHours: 4,
              code: "CS201",
              prerequisites: ["CS101"],
              instructor: "Prof. Michael Chen",
              resources: [
                {
                  id: "res10",
                  title: "Advanced Algorithms Textbook",
                  description: "In-depth coverage of advanced algorithms and data structures with complexity analysis.",
                  type: "pdf",
                  dateAdded: "2024-01-25T09:00:00Z",
                  author: "Prof. Michael Chen",
                  keywords: ["algorithms", "data structures", "complexity"],
                  language: "English"
                }
              ]
            },
            {
              id: "comm-skills",
              title: "Communication Skills",
              description: "Development of professional communication skills including technical writing, presentation skills, and interpersonal communication in cybersecurity contexts.",
              tag: "Soft Skills",
              creditHours: 2,
              code: "ENG201",
              prerequisites: [],
              instructor: "Dr. Lisa Parker",
              resources: [
                {
                  id: "res11",
                  title: "Technical Writing Guide",
                  description: "Comprehensive guide to technical writing for cybersecurity professionals.",
                  type: "pdf",
                  dateAdded: "2024-01-14T14:15:00Z",
                  author: "Dr. Lisa Parker",
                  keywords: ["technical writing", "communication", "professional"],
                  language: "English"
                },
                {
                  id: "res12",
                  title: "Presentation Skills Workshop",
                  description: "Online workshop materials for developing effective presentation skills.",
                  type: "presentation",
                  dateAdded: "2024-01-16T11:30:00Z",
                  author: "Dr. Lisa Parker",
                  keywords: ["presentation", "skills", "workshop"],
                  language: "English"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "software-eng",
      name: "Software Engineering Branch",
      description: "Comprehensive software development and engineering methodologies",
      brochure: {
        title: "Software Engineering Program Brochure 2024",
        filename: "software-eng-brochure-2024.pdf",
        size: "1.8 MB",
        lastUpdated: "2024-01-10"
      },
      semesters: [
        {
          id: "sem1",
          name: "Semester 1",
          subjects: [
            {
              id: "intro-programming",
              title: "Introduction to Programming",
              description: "Fundamentals of programming using Java. Object-oriented programming concepts, basic algorithms, and software development principles.",
              tag: "Core",
              creditHours: 4,
              code: "SE101",
              prerequisites: [],
              instructor: "Prof. David Wilson",
              resources: [
                {
                  id: "res13",
                  title: "Java Programming Tutorial",
                  description: "Step-by-step tutorial for learning Java programming from basics to advanced concepts.",
                  type: "pdf",
                  dateAdded: "2024-01-11T08:00:00Z",
                  author: "Prof. David Wilson",
                  keywords: ["java", "programming", "tutorial"],
                  language: "English"
                },
                {
                  id: "res14",
                  title: "Object-Oriented Programming Examples",
                  description: "Collection of OOP examples and best practices in Java programming.",
                  type: "document",
                  dateAdded: "2024-01-13T10:45:00Z",
                  author: "Prof. David Wilson",
                  keywords: ["oop", "java", "examples"],
                  language: "English"
                }
              ]
            },
            {
              id: "discrete-math",
              title: "Discrete Mathematics",
              description: "Mathematical foundations for computer science including logic, set theory, combinatorics, and graph theory.",
              tag: "Disciplinary",
              creditHours: 3,
              code: "MATH111",
              prerequisites: [],
              instructor: "Dr. Maria Garcia",
              resources: [
                {
                  id: "res15",
                  title: "Discrete Math Problem Sets",
                  description: "Collection of solved problems in discrete mathematics with detailed explanations.",
                  type: "pdf",
                  dateAdded: "2024-01-09T12:30:00Z",
                  author: "Dr. Maria Garcia",
                  keywords: ["discrete math", "problems", "solutions"],
                  language: "English"
                }
              ]
            }
          ]
        },
        {
          id: "sem2",
          name: "Semester 2",
          subjects: [
            {
              id: "oop-design",
              title: "Object-Oriented Programming & Design",
              description: "Advanced OOP concepts, design patterns, and software architecture principles. Focus on building maintainable and scalable software systems.",
              tag: "Core",
              creditHours: 4,
              code: "SE201",
              prerequisites: ["SE101"],
              instructor: "Prof. David Wilson",
              resources: [
                {
                  id: "res16",
                  title: "Design Patterns Handbook",
                  description: "Comprehensive guide to software design patterns with implementation examples.",
                  type: "pdf",
                  dateAdded: "2024-01-21T09:30:00Z",
                  author: "Prof. David Wilson",
                  keywords: ["design patterns", "software architecture", "oop"],
                  language: "English"
                }
              ]
            },
            {
              id: "team-collaboration",
              title: "Team Collaboration & Project Management",
              description: "Agile methodologies, version control, team dynamics, and project management skills essential for software development teams.",
              tag: "Soft Skills",
              creditHours: 3,
              code: "MGT201",
              prerequisites: [],
              instructor: "Dr. Jennifer Lee",
              resources: [
                {
                  id: "res17",
                  title: "Agile Development Guide",
                  description: "Complete guide to agile development methodologies and best practices.",
                  type: "pdf",
                  dateAdded: "2024-01-19T14:00:00Z",
                  author: "Dr. Jennifer Lee",
                  keywords: ["agile", "project management", "team collaboration"],
                  language: "English"
                },
                {
                  id: "res18",
                  title: "Version Control with Git",
                  description: "Interactive tutorial for learning Git version control system.",
                  type: "link",
                  url: "https://learngitbranching.js.org",
                  dateAdded: "2024-01-17T16:20:00Z",
                  author: "Git Learning Community",
                  keywords: ["git", "version control", "collaboration"],
                  language: "English"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
