import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import TopBar from '@/components/TopBar';
import BottomBar from '@/components/BottomBar';
import HomePage from '@/components/HomePage';
import SubjectsPage from '@/components/SubjectsPage';
import ResourcesPage from '@/components/ResourcesPage';
import SupportPage from '@/pages/SupportPage';
import AboutPage from '@/components/AboutPage';
import useMobile from '@/hooks/use-mobile';

const Index = () => {
  const [activeItem, setActiveItem] = useState('home');
  const isMobile = useMobile();

  const navigate = useNavigate();

  const handleItemClick = (item: string) => {
    if (item === 'admin') {
      navigate('/admin');
    } else {
      setActiveItem(item);
    }
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
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {!isMobile && (
        <TopBar
          activeItem={activeItem}
          onItemClick={handleItemClick}
        />
      )}
      
      <main
        className={cn(
          "flex-1 overflow-auto",
          isMobile ? "pb-16" : "pt-16"
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
