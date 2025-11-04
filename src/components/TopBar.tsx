import React from 'react';
import { Home, BookOpen, FolderOpen, HelpCircle, Info, Settings } from 'lucide-react';
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
    { id: 'admin', label: 'Admin', icon: Settings },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-900 border-b border-gray-700 z-50 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 h-16">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
            <img
              src="https://github.com/SICROMONOCO/CyberPack/blob/main/CsR2.png?raw=true"
              alt="Cybersecurity Resources"
              className="w-10 h-10 object-cover rounded-full"
            />
          </div>
          <h1 className="text-xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            CyberPack
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onItemClick(item.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900",
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                )}
              >
                <Icon size={18} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default TopBar;
