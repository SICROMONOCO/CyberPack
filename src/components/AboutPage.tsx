import React from 'react';
import { Shield, Users, BookOpen, Target, Heart, Star, Globe, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'LXO Group',
      role: 'Founder & Lead Developer',
      description: 'Cybersecurity student passionate about creating accessible educational resources',
      icon: Shield
    }
  ];

  const milestones = [
    {
      year: '2024',
      title: 'Project Inception',
      description: 'CyberPack was born from the need to organize and centralize academic resources for cybersecurity students'
    },
    {
      year: '2024',
      title: 'Resource Consolidation',
      description: 'Began collecting and organizing study materials, lab manuals, and course resources from various sources'
    },
    {
      year: '2024',
      title: 'Platform Development',
      description: 'Developed the comprehensive web platform to make resources easily accessible to all students'
    },
    {
      year: 'Future',
      title: 'Community Expansion',
      description: 'Vision to expand beyond Morocco and serve cybersecurity students globally'
    }
  ];

  const values = [
    {
      icon: BookOpen,
      title: 'Academic Excellence',
      description: 'Committed to providing high-quality, relevant educational resources that enhance learning outcomes'
    },
    {
      icon: Users,
      title: 'Collaborative Learning',
      description: 'Fostering a community where knowledge sharing drives collective growth and understanding'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Making cybersecurity education accessible to all students, regardless of their background or location'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Continuously improving and adapting to meet the evolving needs of cybersecurity education'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto p-6 space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
            <Shield size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About CyberPack
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            CyberPack is a personal project by a cybersecurity student at FPO UIZ, Morocco, aiming to make study resources accessible and organized for all. Born from the real struggle of scattered materials and the lack of a unified source, this app is a step toward helping fellow students and building a collaborative academic community.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">My Mission</h2>
              <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
                IXO Intelligence is not a company or official group—it's just a name I created in my free time to represent a spirit of independent thinkers coming together to create interactive and intellectual content. As a student who just completed my first year in the Cybersecurity programme at FPO UIZ, I saw how hard it was to find all the right materials, especially with different professors and no official, unified source. This project is my way of making things easier for myself and others, by hosting all the resources, notes, videos, and useful links in one place.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <Target className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Idea</h3>
                  <p className="text-gray-400">
                    A simple, personal solution to a real student problem: making study materials easy to find and use.
                  </p>
                </div>
                <div className="text-center">
                  <Heart className="w-12 h-12 text-red-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Motivation</h3>
                  <p className="text-gray-400">
                    The lack of a central resource hub drove me to learn web development and build this app, even though it's not my main field.
                  </p>
                </div>
                <div className="text-center">
                  <Star className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Vision</h3>
                  <p className="text-gray-400">
                    To one day turn this site into a real community where anyone can contribute and help future students.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-2xl">My Story</CardTitle>
              <CardDescription className="text-gray-400">
                From a student’s struggle to a shared resource
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                My name is Bilal, and I’m just a student who wanted to make life easier for myself and my classmates. When I started my first year in cybersecurity at FPO UIZ, I quickly realized how hard it was to keep track of all the materials, especially with no official or unified source. That’s when I decided to learn some web development and build this app, even though it’s not my main field.
              </p>
              <p>
                I gathered all the resources I had—notes, videos, links, and references to books or articles—and put them here. The goal is to help new students, and maybe even connect with senior students to get more materials and advice.
              </p>
              <p>
                If this project grows, I hope it can become a real community where anyone can add and share important materials for everyone’s benefit.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-2xl">What This Site Offers</CardTitle>
              <CardDescription className="text-gray-400">
                A simple, organized hub for all your study needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Lecture notes and presentations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Lab manuals, exercises, and practical guides</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300">Useful articles, books, and research papers</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-300">Curated links to external resources</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-gray-300">Materials sorted by semester and subject</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300">Support and advice for new students</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-2xl">Our Values</CardTitle>
            <CardDescription className="text-gray-400">
              The principles that guide our mission
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="text-center space-y-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
                      <IconComponent size={28} className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{value.title}</h3>
                    <p className="text-gray-400 text-sm">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-2xl">Our Journey</CardTitle>
            <CardDescription className="text-gray-400">
              The main steps in building CyberPack
            </CardDescription>
          </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-8">
                {milestones.map((milestone, idx) => (
                  <div key={idx} className="flex items-start gap-6">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm mb-2"
                        style={{
                          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'
                        }}
                        aria-label={milestone.year}
                      >
                        {milestone.year}
                      </div>
                    </div>
                    <div className="flex-1 pb-4">
                      <h4 className="text-lg font-semibold text-white mb-1">{milestone.title}</h4>
                      <p className="text-gray-300 text-sm">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
        </Card>

        {/* Team Section */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-2xl">Who Am I?</CardTitle>
            <CardDescription className="text-gray-400">
              The person behind CyberPack
            </CardDescription>
          </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center gap-10 w-full">
                {/* Bilal Profile */}
                <div className="flex flex-col items-center text-center max-w-sm mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                  <img
                  src="https://raw.githubusercontent.com/SICROMONOCO/CyberPack/refs/heads/main/icon%201.jpg"
                  alt="Bilal's profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                  <a
                  href="https://www.linkedin.com/in/bilal-siki-3ba436320"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-400"
                  >
                  Bilal
                  </a>
                </h3>
                <Badge className="bg-blue-600 text-blue-100 mb-3">Student & Creator</Badge>
                <p className="text-gray-400 mb-6">
                  Just a cybersecurity student at FPO UIZ, Morocco, who wanted to make a difference for myself and others by organizing and sharing resources.
                </p>
                </div>
                {/* IXO Intelligence Group */}
                <div className="flex flex-col items-center text-center max-w-xs">
                <div className="w-14 h-14 bg-gradient-to-tr from-purple-700 to-blue-700 rounded-full flex items-center justify-center mb-2 shadow-lg overflow-hidden">
                  <img
                  src="https://github.com/SICROMONOCO/CyberPack/blob/main/IXO.png?raw=true"
                  alt="IXO Intelligence Group"
                  className="w-12 h-12 object-cover rounded-full"
                  />
                </div>
                <span className="text-lg font-bold text-purple-300 tracking-widest mb-1" style={{ letterSpacing: '0.18em' }}>
                  IXO Intelligence Group
                </span>
                <span className="block w-10 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-2"></span>
                <span className="text-gray-400 text-sm italic px-4 text-center">
                  A personal initiative and name representing a spirit of independent thinkers creating interactive and intellectual content together.
                </span>
                </div>
              </div>
            </CardContent>
        </Card>

        {/* Future Vision */}
        <Card className="bg-gradient-to-br from-blue-900 to-purple-900 border-blue-700">
          <CardContent className="p-8 text-center">
            <Globe className="w-16 h-16 text-blue-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Looking Forward</h2>
            <p className="text-blue-100 text-lg mb-6 max-w-3xl mx-auto">
              My hope is that CyberPack will grow into a real community where anyone can contribute, edit, and host important materials for all students. For now, it’s just a small project by one student, but maybe together we can make it something bigger.
            </p>
            <p className="text-blue-200">
              Thank you for visiting and being part of this journey!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;

