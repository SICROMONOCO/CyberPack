import React from 'react';
import { Home, BookOpen, FolderOpen, HelpCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomBarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const BottomBar = ({ activeItem, onItemClick }: BottomBarProps) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'resources', label: 'Resources', icon: FolderOpen },
    { id: 'support', label: 'Support', icon: HelpCircle },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <div className="fixed bottom-10 left-0 right-0 bg-gray-900 border-t border-gray-700 z-50 md:hidden">
      <nav className="flex justify-around items-center h-16">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-blue-500",
                isActive ? "text-blue-400" : "text-gray-400 hover:text-white"
              )}
            >
              <Icon size={24} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomBar;
