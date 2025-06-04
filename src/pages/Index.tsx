
import React, { useState } from 'react';
import { BookOpen, FolderOpen, HelpCircle, Info } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import HomePage from '@/components/HomePage';
import SubjectsPage from '@/components/SubjectsPage';
import PlaceholderPage from '@/components/PlaceholderPage';

const Index = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('home');

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'home':
        return <HomePage />;
      case 'subjects':
        return <SubjectsPage />;
      case 'resources':
        return (
          <PlaceholderPage
            title="Resources"
            description="Download and access study resources, notes, presentations, and reference materials."
            icon={FolderOpen}
          />
        );
      case 'support':
        return (
          <PlaceholderPage
            title="Support & Help"
            description="Get assistance and find answers to your academic questions from our support team."
            icon={HelpCircle}
          />
        );
      case 'about':
        return (
          <PlaceholderPage
            title="About Us"
            description="Learn more about CyberPack's mission to support cybersecurity students in their academic journey."
            icon={Info}
          />
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={handleToggle}
        activeItem={activeItem}
        onItemClick={handleItemClick}
      />
      
      <main
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
