
export const mockSubjectsData = {
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
              instructor: "Dr. Sarah Johnson"
            },
            {
              id: "algo-prog-1",
              title: "Algorithm & Programming I",
              description: "Introduction to programming fundamentals using Python. Covers basic algorithms, data structures, and problem-solving techniques essential for cybersecurity professionals.",
              tag: "Core",
              creditHours: 4,
              code: "CS101",
              prerequisites: [],
              instructor: "Prof. Michael Chen"
            },
            {
              id: "calc-1",
              title: "Calculus I",
              description: "Differential and integral calculus with applications in computer science and cybersecurity. Focus on mathematical foundations required for advanced coursework.",
              tag: "Disciplinary",
              creditHours: 3,
              code: "MATH101",
              prerequisites: [],
              instructor: "Dr. Emily Rodriguez"
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
              instructor: "Dr. Alex Thompson"
            },
            {
              id: "data-structures",
              title: "Data Structures & Algorithms II",
              description: "Advanced data structures and algorithm analysis. Implementation of trees, graphs, hash tables, and their applications in cybersecurity contexts.",
              tag: "Core",
              creditHours: 4,
              code: "CS201",
              prerequisites: ["CS101"],
              instructor: "Prof. Michael Chen"
            },
            {
              id: "comm-skills",
              title: "Communication Skills",
              description: "Development of professional communication skills including technical writing, presentation skills, and interpersonal communication in cybersecurity contexts.",
              tag: "Soft Skills",
              creditHours: 2,
              code: "ENG201",
              prerequisites: [],
              instructor: "Dr. Lisa Parker"
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
              instructor: "Prof. David Wilson"
            },
            {
              id: "discrete-math",
              title: "Discrete Mathematics",
              description: "Mathematical foundations for computer science including logic, set theory, combinatorics, and graph theory.",
              tag: "Disciplinary",
              creditHours: 3,
              code: "MATH111",
              prerequisites: [],
              instructor: "Dr. Maria Garcia"
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
              instructor: "Prof. David Wilson"
            },
            {
              id: "team-collaboration",
              title: "Team Collaboration & Project Management",
              description: "Agile methodologies, version control, team dynamics, and project management skills essential for software development teams.",
              tag: "Soft Skills",
              creditHours: 3,
              code: "MGT201",
              prerequisites: [],
              instructor: "Dr. Jennifer Lee"
            }
          ]
        }
      ]
    }
  ]
};
