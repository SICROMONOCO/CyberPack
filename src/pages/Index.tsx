import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/Sidebar';
import BottomBar from '@/components/BottomBar';
import HomePage from '@/components/HomePage';
import SubjectsPage from '@/components/SubjectsPage';
import ResourcesPage from '@/components/ResourcesPage';
import SupportPage from '@/pages/SupportPage';
import AboutPage from '@/components/AboutPage';
import useMobile from '@/hooks/use-mobile';

const Index = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const isMobile = useMobile();

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'home':
        return <HomePage onNavigate={handleItemClick} />;
      case 'subjects':
        return <SubjectsPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'support':
        return <SupportPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onNavigate={handleItemClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {!isMobile && (
        <Sidebar
          isCollapsed={isCollapsed}
          onToggle={handleToggle}
          activeItem={activeItem}
          onItemClick={handleItemClick}
        />
      )}
      
      <main
        className={cn(
          "flex-1 transition-all duration-300 overflow-auto",
          isMobile ? "pb-16" : (isCollapsed ? "ml-20" : "ml-64")
        )}
      >
        <div className="min-h-full">
          {renderContent()}
        </div>
      </main>

      {isMobile && (
        <BottomBar
          activeItem={activeItem}
          onItemClick={handleItemClick}
        />
      )}
    </div>
  );
};

export default Index;
