import React from 'react';
import { Home, BookOpen, FolderOpen, HelpCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopBarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const TopBar = ({ activeItem, onItemClick }: TopBarProps) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'resources', label: 'Resources', icon: FolderOpen },
    { id: 'support', label: 'Support', icon: HelpCircle },
    { id: 'about', label: 'About Us', icon: Info },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 h-16 bg-gray-900 border-b border-gray-700 z-50 flex items-center justify-between px-4 md:px-8 shadow-lg backdrop-blur-sm"
      role="navigation"
      aria-label="Main navigation bar"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 min-w-max">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg select-none overflow-hidden">
          <img
            src="https://github.com/SICROMONOCO/CyberPack/blob/main/CsR2.png?raw=true"
            alt="CyberPack Logo"
            className="w-10 h-10 object-cover rounded-full"
            draggable="false"
          />
        </div>
        <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent select-none">
          CyberPack
        </span>
      </div>
      {/* Navigation */}
      <nav className="flex-1 flex items-center justify-end gap-1 md:gap-2">
        {menuItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeItem === id;
          return (
            <button
              key={id}
              onClick={() => onItemClick(id)}
              className={cn(
                "flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900",
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-[1.04]"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white hover:scale-[1.04]"
              )}
              aria-current={isActive ? 'page' : undefined}
              aria-label={label}
              tabIndex={0}
            >
              <Icon size={20} aria-hidden="true" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};

export default TopBar;
