
import React from 'react';
import { BookOpen, FolderOpen, HelpCircle, ArrowRight, Users, Award, Clock } from 'lucide-react';

const HomePage = () => {
  const featureCards = [
    {
      title: 'Explore Subjects',
      description: 'Access materials for all your academic branches and specializations.',
      icon: BookOpen,
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      title: 'Access Resources',
      description: 'Download or view study resources, notes, and reference materials.',
      icon: FolderOpen,
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      title: 'Get Support & Help',
      description: 'Get assistance and find answers to your academic questions.',
      icon: HelpCircle,
      gradient: 'from-pink-600 to-red-600'
    }
  ];

  const stats = [
    { icon: Users, label: 'Active Students', value: '500+' },
    { icon: BookOpen, label: 'Course Materials', value: '150+' },
    { icon: Award, label: 'Success Rate', value: '95%' }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold">
                Welcome to Your
              </h1>
              <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                CyberPack
              </h2>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Your all-in-one hub for academic resources, study materials, and student support.
              </p>
              <p className="text-lg text-blue-400 font-semibold">
                Excel in your studies with everything you need, beautifully organized.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center gap-3 bg-gray-800/50 rounded-full px-6 py-3 backdrop-blur-sm">
                    <Icon size={24} className="text-blue-400" />
                    <div className="text-left">
                      <div className="font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {featureCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="group relative bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                
                <div className="relative space-y-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center`}>
                    <Icon size={32} className="text-white" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center text-blue-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>Learn more</span>
                    <ArrowRight size={20} className="ml-2" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Latest Updates Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center space-y-12">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">Latest Updates</h2>
            <p className="text-xl text-gray-400">Stay informed with our newest resources and features</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={20} className="text-blue-400" />
                <span className="text-sm text-gray-400">2 days ago</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">New Cybersecurity Resources Added</h3>
              <p className="text-gray-400 text-sm">Updated materials for advanced encryption and network security courses.</p>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={20} className="text-purple-400" />
                <span className="text-sm text-gray-400">1 week ago</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Algorithm Study Guides Available</h3>
              <p className="text-gray-400 text-sm">Comprehensive guides for data structures and algorithm analysis.</p>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-pink-500/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={20} className="text-pink-400" />
                <span className="text-sm text-gray-400">2 weeks ago</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Support System Enhanced</h3>
              <p className="text-gray-400 text-sm">Improved help system with faster response times and better resources.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
