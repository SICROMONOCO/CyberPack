import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import TopBar from '@/components/TopBar';
import FooterBar from '@/components/FooterBar';
import BottomBar from '@/components/BottomBar';
import HomePage from '@/components/HomePage';
import SubjectsPage from '@/components/SubjectsPage';
import ResourcesPage from '@/components/ResourcesPage';
import SupportPage from '@/pages/SupportPage';
import AboutPage from '@/components/AboutPage';
import useMobile from '@/hooks/use-mobile';

const Index = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [subjectFilter, setSubjectFilter] = useState<null | { subjectId: string; branchId?: string; semesterId?: string }>(null);
  const isMobile = useMobile();

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    if (item !== 'resources') {
      setSubjectFilter(null);
    }
  };

  const handleSubjectCardClick = (subject: any) => {
    setSubjectFilter({ subjectId: subject.id, branchId: subject.branchId, semesterId: subject.semesterId });
    setActiveItem('resources');
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'home':
        return <HomePage onNavigate={handleItemClick} />;
      case 'subjects':
        return <SubjectsPage onSubjectClick={handleSubjectCardClick} />;
      case 'resources':
        return <ResourcesPage subjectFilter={subjectFilter} />;
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
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-2 left-2 z-[1000] bg-blue-700 text-white px-4 py-2 rounded shadow-lg"
        tabIndex={0}
      >
        Skip to main content
      </a>
      {!isMobile && (
        <TopBar
          activeItem={activeItem}
          onItemClick={handleItemClick}
        />
      )}
      <main
        id="main-content"
        className={cn(
          "flex-1 transition-all duration-300 overflow-auto w-full",
          isMobile ? "pt-0 pb-16" : "pt-16 pb-14"
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
      <FooterBar />
    </div>
  );
};

export default Index;
