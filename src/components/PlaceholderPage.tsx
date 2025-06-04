
import React from 'react';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const PlaceholderPage = ({ title, description, icon: Icon }: PlaceholderPageProps) => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-center space-y-8 max-w-2xl mx-auto px-6">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
          <Icon size={48} className="text-white" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>
        
        <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
          <h2 className="text-2xl font-semibold text-white mb-4">Coming Soon</h2>
          <p className="text-gray-400">
            This section is currently under development. We're working hard to bring you 
            comprehensive resources and tools to enhance your academic journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
