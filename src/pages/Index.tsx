
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/Sidebar';
import HomePage from '@/components/HomePage';
import SubjectsPage from '@/components/SubjectsPage';
import ResourcesPage from '@/components/ResourcesPage';
import SupportPage from '@/components/SupportPage';
import AboutPage from '@/components/AboutPage';

const Index = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('home');

  // Handle mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    if (window.innerWidth < 768) {
      setIsCollapsed(true);
    }
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
    <div className="min-h-screen bg-gray-950 flex overflow-hidden">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={handleToggle}
        activeItem={activeItem}
        onItemClick={handleItemClick}
      />
      
      <main
        className={cn(
          "flex-1 transition-all duration-300 overflow-auto",
          isCollapsed ? "ml-16" : "ml-64",
          "md:ml-16 md:data-[collapsed=false]:ml-64"
        )}
        data-collapsed={isCollapsed}
      >
        <div className="min-h-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
