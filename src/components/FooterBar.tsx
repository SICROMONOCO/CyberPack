import React from 'react';

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
        className="ml-2 px-2 py-1 rounded bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-colors text-xs focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
        aria-label="Linktree"
      >
        Linktree
      </a>
    </div>
  </footer>
);

export default FooterBar;
