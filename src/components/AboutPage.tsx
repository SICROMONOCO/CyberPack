
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
            Empowering the next generation of cybersecurity professionals through accessible, 
            organized, and comprehensive educational resources
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
                CyberPack is a dedicated digital library initiated by and for cybersecurity bachelor's program 
                students in Morocco. Born from the recognition that scattered educational resources create 
                unnecessary barriers to learning, CyberPack serves as a centralized, well-organized repository 
                for collective knowledge in the field of cybersecurity.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <Target className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Vision</h3>
                  <p className="text-gray-400">
                    To be the premier academic resource hub for cybersecurity students across Morocco and beyond
                  </p>
                </div>
                <div className="text-center">
                  <Heart className="w-12 h-12 text-red-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Purpose</h3>
                  <p className="text-gray-400">
                    Streamlining the learning process by providing organized access to essential study materials
                  </p>
                </div>
                <div className="text-center">
                  <Star className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Impact</h3>
                  <p className="text-gray-400">
                    Enhancing understanding and fostering a collaborative community of learners
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
              <CardTitle className="text-white text-2xl">Our Story</CardTitle>
              <CardDescription className="text-gray-400">
                From personal organization to community resource
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                What began as a personal organizational endeavor has evolved into a vision for a valuable 
                collaborative tool for all current and future cybersecurity students. The inspiration came 
                from experiencing firsthand the challenges of navigating scattered resources across multiple 
                platforms and sources.
              </p>
              <p>
                CyberPack was created to address this fundamental need: a single, accessible, and 
                well-organized repository where students can find everything from foundational concepts 
                to advanced practical labs and course materials.
              </p>
              <p>
                We believe that sharing and centralizing resources can collectively enhance understanding, 
                foster a community of learners, and contribute to growth in the critical field of cybersecurity.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-2xl">What We Offer</CardTitle>
              <CardDescription className="text-gray-400">
                Comprehensive resources for academic success
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Organized lecture notes and presentations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Practical lab manuals and exercises</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300">Relevant academic articles and research papers</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-300">Curated external educational links</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-gray-300">Course materials organized by semester and subject</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300">Support resources and academic guidance</span>
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
              Key milestones in CyberPack's development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {milestone.year}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-700 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-lg font-semibold text-white mb-2">{milestone.title}</h3>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-2xl">Our Team</CardTitle>
            <CardDescription className="text-gray-400">
              The people behind CyberPack
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              {teamMembers.map((member, index) => {
                const IconComponent = member.icon;
                return (
                  <div key={index} className="text-center max-w-sm">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                    <Badge className="bg-blue-600 text-blue-100 mb-3">{member.role}</Badge>
                    <p className="text-gray-400">{member.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Future Vision */}
        <Card className="bg-gradient-to-br from-blue-900 to-purple-900 border-blue-700">
          <CardContent className="p-8 text-center">
            <Globe className="w-16 h-16 text-blue-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Looking Forward</h2>
            <p className="text-blue-100 text-lg mb-6 max-w-3xl mx-auto">
              Our vision extends beyond Morocco's borders. We aspire to create a global network of 
              cybersecurity educational resources, connecting students worldwide and fostering 
              international collaboration in cybersecurity education.
            </p>
            <p className="text-blue-200">
              Together, we're building the future of cybersecurity education—one resource at a time.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;

