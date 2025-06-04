
import React, { useState } from 'react';
import { BookOpen, FolderOpen, HelpCircle, Info } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import HomePage from '@/components/HomePage';
import SubjectsPage from '@/components/SubjectsPage';
import ResourcesPage from '@/components/ResourcesPage';
import SupportPage from '@/components/SupportPage';
import AboutPage from '@/components/AboutPage';

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
        return <ResourcesPage />;
      case 'support':
        return <SupportPage />;
      case 'about':
        return <AboutPage />;
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

