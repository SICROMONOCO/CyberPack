import React from 'react';
import { BookOpen, FolderOpen, HelpCircle, ArrowRight, Users, Award, Clock } from 'lucide-react';

interface HomePageProps {
  onNavigate?: (section: string) => void;
}

const HomePage = ({ onNavigate }: HomePageProps) => {
  const featureCards = [
    {
      title: 'Explore Subjects',
      description: 'Access materials for all your academic branches and specializations.',
      icon: BookOpen,
      gradient: 'from-blue-600 to-purple-600',
      section: 'subjects',
    },
    {
      title: 'Access Resources',
      description: 'Download or view study resources, notes, and reference materials.',
      icon: FolderOpen,
      gradient: 'from-purple-600 to-pink-600',
      section: 'resources',
    },
    {
      title: 'Get Support & Help',
      description: 'Get assistance and find answers to your academic questions.',
      icon: HelpCircle,
      gradient: 'from-pink-600 to-red-600',
      section: 'support',
    }
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
                  
                  <button
                    className="flex items-center text-blue-400 font-semibold group-hover:translate-x-2 transition-transform duration-300 focus:outline-none"
                    onClick={() => onNavigate && onNavigate(card.section)}
                    tabIndex={0}
                    aria-label={`Learn more about ${card.title}`}
                  >
                    <span>Learn more</span>
                    <ArrowRight size={20} className="ml-2" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
