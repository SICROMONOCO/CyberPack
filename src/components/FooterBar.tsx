import React from 'react';
import { Github, Link as LinkIcon } from 'lucide-react';

const FooterBar = () => (
  <footer
    className="flex fixed left-0 right-0 h-10 bg-gray-900 border-t border-gray-700 z-40 items-center justify-end px-4 sm:px-6 shadow-lg backdrop-blur-sm"
    style={{ bottom: 'env(safe-area-inset-bottom, 0px)' }}
  >
    <div className="flex items-center gap-2 bg-gray-800/80 border border-gray-700 rounded px-2 sm:px-3 py-1 shadow text-[11px]">
      <span className="font-semibold text-gray-200">CyberPack v1.0</span>
      <span className="text-gray-400">|</span>
      <span className="text-gray-400">Digital Learning Hub</span>
      <a
        href="https://linktr.ee/monocosicro"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-2 px-2 py-1 rounded bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-colors text-xs focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center gap-1"
        aria-label="Linktree"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M128,232a104,104,0,1,1,104-104A104.11791,104.11791,0,0,1,128,232Zm0-192a88,88,0,1,0,88,88A88.09957,88.09957,0,0,0,128,40Zm0,120a8,8,0,0,1-8-8V104a8,8,0,0,1,16,0v48A8,8,0,0,1,128,160Zm0-72a12,12,0,1,1,12-12A12.01343,12.01343,0,0,1,128,88Z" fill="currentColor"/></svg>
      </a>
      <a
        href="https://github.com/SICROMONOCO/CyberPack"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-2 px-2 py-1 rounded bg-gradient-to-r from-gray-800 to-gray-700 text-white font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-colors text-xs focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center gap-1"
        aria-label="GitHub"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M128,24A104,104,0,0,0,24,128c0,45.84,29.72,84.72,71,98.44,5.18.96,7.08-2.24,7.08-5V210.6c-28.88,6.28-35-13.92-35-13.92-4.72-12-11.52-15.2-11.52-15.2-9.44-6.48.72-6.36.72-6.36,10.44.72,15.92,10.72,15.92,10.72,9.28,15.92,24.36,11.32,30.32,8.68.96-6.72,3.64-11.32,6.64-13.92-23.08-2.64-47.36-11.56-47.36-51.48,0-11.36,4.08-20.64,10.72-27.92-1.08-2.64-4.64-13.32,1-27.76,0,0,8.72-2.8,28.56,10.68a98.48,98.48,0,0,1,52,0c19.84-13.48,28.56-10.68,28.56-10.68,5.68,14.44,2.12,25.12,1,27.76,6.68,7.28,10.72,16.56,10.72,27.92,0,40-24.36,48.8-47.56,51.4,3.76,3.24,7.12,9.64,7.12,19.44v28.84c0,2.8,1.88,6,7.12,5C202.28,212.72,232,173.84,232,128A104,104,0,0,0,128,24Z" fill="currentColor"/></svg>
      </a>
    </div>
  </footer>
);

export default FooterBar;
