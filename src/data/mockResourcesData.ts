
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'link' | 'document' | 'presentation' | 'image';
  url?: string;
  fileSize?: string;
  dateAdded: string;
  lastUpdated?: string;
  author?: string;
  keywords?: string[];
  language?: string;
}

export interface Subject {
  id: string;
  title: string;
  description: string;
  tag: string;
  creditHours: number;
  code: string;
  prerequisites: string[];
  instructor: string;
  branchId: string;
  semesterId: string;
  resources: Resource[];
}

export interface Semester {
  id: string;
  name: string;
  subjects: Subject[];
}

export interface Branch {
  id: string;
  name: string;
  description: string;
  icon: string;
  semesters: Semester[];
}

export const mockResourcesData: Branch[] = [
  {
    id: 'cybersecurity',
    name: 'Cybersecurity Branch',
    description: 'Comprehensive cybersecurity education covering network security, ethical hacking, and digital forensics.',
    icon: '🔒',
    semesters: [
      {
        id: 'semester-1',
        name: 'Semester 1',
        subjects: [
          {
            id: 'acc-mgmt-1',
            title: 'Accounting & Management I',
            description: 'Introduction to fundamental accounting principles and basic management concepts.',
            tag: 'Disciplinary',
            creditHours: 3,
            code: 'ACC101',
            prerequisites: [],
            instructor: 'Dr. Sarah Johnson',
            branchId: 'cybersecurity',
            semesterId: 'semester-1',
            resources: [
              {
                id: 'acc-lecture-1',
                title: 'Introduction to Accounting Principles',
                description: 'Comprehensive overview of basic accounting concepts and financial statements.',
                type: 'pdf',
                fileSize: '2.5 MB',
                dateAdded: '2024-01-15',
                author: 'Dr. Sarah Johnson',
                keywords: ['accounting', 'principles', 'financial statements'],
                language: 'English'
              },
              {
                id: 'acc-video-1',
                title: 'Accounting Fundamentals Tutorial',
                description: 'Video tutorial covering the basics of double-entry bookkeeping.',
                type: 'video',
                url: 'https://youtube.com/watch?v=example1',
                dateAdded: '2024-01-20',
                author: 'Prof. Economics',
                keywords: ['tutorial', 'bookkeeping', 'fundamentals'],
                language: 'English'
              }
            ]
          },
          {
            id: 'algo-prog-1',
            title: 'Algorithm & Programming I',
            description: 'Introduction to programming concepts, algorithms, and problem-solving techniques.',
            tag: 'Disciplinary',
            creditHours: 4,
            code: 'CS101',
            prerequisites: [],
            instructor: 'Prof. Michael Chen',
            branchId: 'cybersecurity',
            semesterId: 'semester-1',
            resources: [
              {
                id: 'algo-slides-1',
                title: 'Algorithm Design Principles',
                description: 'Slide presentation covering fundamental algorithm design techniques.',
                type: 'presentation',
                fileSize: '4.2 MB',
                dateAdded: '2024-01-10',
                author: 'Prof. Michael Chen',
                keywords: ['algorithms', 'design', 'programming'],
                language: 'English'
              },
              {
                id: 'prog-exercises',
                title: 'Programming Practice Problems',
                description: 'Collection of programming exercises with solutions.',
                type: 'document',
                fileSize: '1.8 MB',
                dateAdded: '2024-01-25',
                author: 'Prof. Michael Chen',
                keywords: ['programming', 'exercises', 'practice'],
                language: 'English'
              }
            ]
          }
        ]
      },
      {
        id: 'semester-2',
        name: 'Semester 2',
        subjects: [
          {
            id: 'network-security',
            title: 'Network Security Fundamentals',
            description: 'Core concepts of network security, including firewalls, VPNs, and intrusion detection.',
            tag: 'Disciplinary',
            creditHours: 4,
            code: 'CS201',
            prerequisites: ['algo-prog-1'],
            instructor: 'Dr. Alex Rodriguez',
            branchId: 'cybersecurity',
            semesterId: 'semester-2',
            resources: [
              {
                id: 'net-sec-manual',
                title: 'Network Security Lab Manual',
                description: 'Hands-on lab exercises for network security implementation.',
                type: 'pdf',
                fileSize: '6.7 MB',
                dateAdded: '2024-02-01',
                author: 'Dr. Alex Rodriguez',
                keywords: ['network', 'security', 'lab', 'manual'],
                language: 'English'
              },
              {
                id: 'firewall-config',
                title: 'Firewall Configuration Guide',
                description: 'Step-by-step guide for configuring enterprise firewalls.',
                type: 'document',
                fileSize: '3.1 MB',
                dateAdded: '2024-02-10',
                author: 'Network Security Team',
                keywords: ['firewall', 'configuration', 'enterprise'],
                language: 'English'
              }
            ]
          }
        ]
      }
    ]
  }
];

