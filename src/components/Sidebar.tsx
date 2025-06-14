
import React from 'react';
import { Home, BookOpen, FolderOpen, HelpCircle, Info, Menu, X, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import UserProfile from './UserProfile';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeItem: string;
  onItemClick: (item: string) => void;
}

const Sidebar = ({ isCollapsed, onToggle, activeItem, onItemClick }: SidebarProps) => {
  const { isAuthenticated } = useAuth();
  
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'resources', label: 'Resources', icon: FolderOpen },
    { id: 'support', label: 'Support', icon: HelpCircle },
    { id: 'about', label: 'About Us', icon: Info },
  ];

  const handleLoginClick = () => {
    onItemClick('login');
  };

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full bg-gray-900 border-r border-gray-700 transition-all duration-300 z-50",
        "shadow-lg backdrop-blur-sm",
        isCollapsed ? "w-16" : "w-64",
        // Mobile responsiveness
        "md:translate-x-0",
        isCollapsed ? "translate-x-0" : "translate-x-0"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900/95 backdrop-blur-sm">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              CyberPack
            </h1>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-all duration-200 transform hover:scale-105"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* User Profile / Login */}
        <div className="p-4 border-b border-gray-700">
          {isAuthenticated ? (
            <UserProfile isCollapsed={isCollapsed} />
          ) : (
            <div className="space-y-2">
              {!isCollapsed ? (
                <Button
                  onClick={handleLoginClick}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              ) : (
                <div className="relative group">
                  <Button
                    onClick={handleLoginClick}
                    variant="ghost"
                    size="sm"
                    className="w-full p-2 text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    <LogIn className="w-4 h-4" />
                  </Button>
                  <div className="absolute left-full ml-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-gray-700">
                    Sign In
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-200px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onItemClick(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left group relative",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900",
                  isActive 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-[1.02]" 
                    : "text-gray-300 hover:bg-gray-800 hover:text-white hover:transform hover:scale-[1.02]"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon 
                  size={20} 
                  className={cn(
                    "flex-shrink-0 transition-transform duration-200",
                    isActive ? "transform scale-110" : "group-hover:transform group-hover:scale-110"
                  )} 
                />
                {!isCollapsed && (
                  <span className="font-medium transition-all duration-200">
                    {item.label}
                  </span>
                )}
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full" />
                )}
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-gray-700">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-900/95 backdrop-blur-sm">
          {!isCollapsed && (
            <div className="text-xs text-gray-500 text-center">
              <p>CyberPack v1.0</p>
              <p className="text-gray-600">Digital Learning Hub</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
