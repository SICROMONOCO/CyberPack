import React from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar'; // Re-use the existing sidebar content

interface MobileSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeItem: string;
  onItemClick: (item: string) => void;
}

const MobileSidebar = ({ isCollapsed, onToggle, activeItem, onItemClick }: MobileSidebarProps) => {
  return (
    <Drawer open={!isCollapsed} onOpenChange={onToggle}>
      <DrawerTrigger asChild>
        <button className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-900 text-white md:hidden">
          <Menu size={24} />
        </button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-64 bg-gray-900 border-r-0">
        <Sidebar
          isCollapsed={false} // Always expanded in mobile view
          onToggle={onToggle}
          activeItem={activeItem}
          onItemClick={onItemClick}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default MobileSidebar;
