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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-20">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="space-y-2 sm:space-y-4">
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold">
                Welcome to Your
              </h1>
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                CyberPack
              </h2>
            </div>
            <div className="max-w-2xl sm:max-w-3xl mx-auto space-y-2 sm:space-y-4">
              <p className="text-base sm:text-xl md:text-2xl text-gray-300 leading-relaxed">
                Your all-in-one hub for academic resources, study materials, and student support.
              </p>
              <p className="text-sm sm:text-lg text-blue-400 font-semibold">
                Excel in your studies with everything you need, beautifully organized.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
          {featureCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="group relative bg-gray-900 rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>

                <div className="relative space-y-4 sm:space-y-6">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center`}>
                    <Icon size={28} className="sm:hidden text-white" />
                    <Icon size={32} className="hidden sm:block text-white" />
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-lg sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                      {card.description}
                    </p>
                  </div>

                  <button
                    className="flex items-center text-blue-400 font-semibold group-hover:translate-x-2 transition-transform duration-300 focus:outline-none text-sm sm:text-base"
                    onClick={() => onNavigate && onNavigate(card.section)}
                    tabIndex={0}
                    aria-label={`Learn more about ${card.title}`}
                  >
                    <span>Learn more</span>
                    <ArrowRight size={18} className="ml-2 sm:hidden" />
                    <ArrowRight size={20} className="ml-2 hidden sm:inline" />
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
