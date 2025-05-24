import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isTopPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200">
      {!isTopPage && (
        <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="戻る"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            
            <h1 className="text-xl font-bold text-gray-800">ValueSync</h1>
            
            <div className="w-10" /> {/* Spacer for alignment */}
          </div>
        </header>
      )}

      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${!isTopPage ? 'pt-24' : ''} pb-8`}>
        <div className={`
          ${isTopPage ? '' : 'bg-white shadow-xl rounded-lg p-6'}
          transition-all duration-300
        `}>
          {children}
        </div>
      </main>

      {!isTopPage && (
        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
            <p>&copy; 2024 ValueSync. All rights reserved.</p>
          </div>
        </footer>
      )}
    </div>
  );
}

// オプションのサブコンポーネント
Layout.Header = function Header({ title, onBack, rightContent }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        {onBack && (
          <Button
            variant="outline"
            onClick={onBack}
            className="mr-4"
          >
            戻る
          </Button>
        )}
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      {rightContent && (
        <div className="flex items-center">
          {rightContent}
        </div>
      )}
    </div>
  );
};