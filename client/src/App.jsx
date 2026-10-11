import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { TripProvider } from './context/TripContext';
import { Header } from './components/common/Header';

import { HomePage } from './pages/HomePage';
import { PlanPage } from './pages/PlanPage';
import { ItineraryPage } from './pages/ItineraryPage';
import { MyTripsPage } from './pages/MyTripsPage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';

import { Compass } from 'lucide-react';

function AppContent() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-[#080D1B] text-[#F8FAFC] flex flex-col font-sans transition-colors duration-200">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
          <Route path="/my-trips" element={<MyTripsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-[#080D1B] border-t border-[#29354B] py-8 text-xs text-[#94A3B8] print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-300">TripWise AI — Smart Editable Travel Planner</span>
          </div>

          <div className="flex items-center gap-6 text-[#94A3B8]">
            <Link to="/about" className="hover:text-cyan-400 transition-colors">About & Architecture</Link>
            <Link to="/about#contact" className="hover:text-cyan-400 transition-colors">Contact Support</Link>
            <span>© 2026 TripWise AI.</span>
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
