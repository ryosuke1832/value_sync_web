import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GameProvider } from './context/GameContext';
import Layout from './components/Layout';

// Pages
import TopPage from './pages/TopPage';
import MemberNumberSetting from './pages/MemberNumberSetting';
import MemberNameSetting from './pages/MemberNameSetting';
import ThemeSelect from './pages/ThemeSelect';
import ConfirmationPage from './pages/ConfirmationPage';
import DiscussionPage from './pages/DiscussionPage';
import ResultInput from './pages/ResultInput';
import ResultPage from './pages/ResultPage';

// LoadingSpinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <GameProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <Layout>
              <Routes>
                <Route path="/" element={<TopPage />} />
                <Route path="/member-number" element={<MemberNumberSetting />} />
                <Route path="/member-names" element={<MemberNameSetting />} />
                <Route path="/theme-select" element={<ThemeSelect />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
                <Route path="/discussion" element={<DiscussionPage />} />
                <Route path="/result-input" element={<ResultInput />} />
                <Route path="/result" element={<ResultPage />} />
              </Routes>
            </Layout>
          </Suspense>
        </GameProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;