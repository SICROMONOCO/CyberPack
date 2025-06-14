import React, { useState, useEffect } from 'react';
import { BookOpen, FolderOpen, HelpCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/Sidebar';
import HomePage from '@/components/HomePage';
import SubjectsPage from '@/components/SubjectsPage';
import ResourcesPage from '@/components/ResourcesPage';
import SupportPage from '@/components/SupportPage';
import AboutPage from '@/components/AboutPage';
import LoginForm from '@/components/LoginForm';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const { isAuthenticated } = useAuth();

  // Handle mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    // Check on mount
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset to home if user is already logged in and selects login
  useEffect(() => {
    if (isAuthenticated && activeItem === 'login') {
      setActiveItem('home');
    }
  }, [isAuthenticated, activeItem]);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    // Auto-collapse on mobile after selection
    if (window.innerWidth < 768) {
      setIsCollapsed(true);
    }
  };

  // Show login form if login is selected and user is not authenticated
  if (activeItem === 'login' && !isAuthenticated) {
    return <LoginForm onClose={() => setActiveItem('home')} />;
  }

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
    <div className="min-h-screen flex overflow-hidden">
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
          // Mobile responsiveness
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
