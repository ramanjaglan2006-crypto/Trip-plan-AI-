import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TripProvider, useTripContext } from './context/TripContext';
import { Header } from './components/common/Header';
import { DevSimulatorPanel } from './components/common/DevSimulatorPanel';

import { HomePage } from './pages/HomePage';
import { PlanPage } from './pages/PlanPage';
import { ItineraryPage } from './pages/ItineraryPage';
import { MyTripsPage } from './pages/MyTripsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

import { ShieldCheck } from 'lucide-react';

function AppContent() {
  const { simulatedError, setSimulatedError, apiKey, setApiKey } = useTripContext();
  const [darkMode, setDarkMode] = useState(true);
  const [devPanelOpen, setDevPanelOpen] = useState(false);

  useEffect(() => {
    // Default to dark mode matching screenshot styling
    document.documentElement.classList.add('dark');
  }, []);

  const handleToggleDarkMode = (val) => {
    setDarkMode(val);
    if (val) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <Header
        darkMode={darkMode}
        setDarkMode={handleToggleDarkMode}
        onToggleDevPanel={() => setDevPanelOpen(!devPanelOpen)}
        devPanelOpen={devPanelOpen}
        apiKey={apiKey}
        setApiKey={setApiKey}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
          <Route path="/my-trips" element={<MyTripsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      {/* Evaluator Live Test Bench */}
      {devPanelOpen && (
        <DevSimulatorPanel
          currentError={simulatedError}
          onSelectError={(type) => setSimulatedError(type)}
          onClose={() => setDevPanelOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8 text-xs text-slate-400 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>TripWise AI — React 18, Express, Vite, Zod & Tailwind CSS</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-500">
              Frontend Internship Assignment Submission
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <TripProvider>
        <AppContent />
      </TripProvider>
    </BrowserRouter>
  );
}
