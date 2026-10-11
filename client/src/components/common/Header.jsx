import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Moon, Sun, User, Menu } from 'lucide-react';

export function Header({
  darkMode,
  setDarkMode,
}) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Explore & Plan', path: '/plan' },
    { label: 'Current Itinerary', path: '/itinerary' },
    { label: 'My Trips', path: '/my-trips' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-emerald-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-wider text-white uppercase font-sans">
                TRIPWISE <span className="text-cyan-400">AI</span>
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wide font-medium hidden sm:block">
              EDITABLE ITINERARY ENGINE
            </p>
          </div>
        </Link>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-bold transition-all px-3 py-1.5 rounded-full ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/60 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-400" />}
          </button>

          {/* Login Pill Button */}
          <button
            onClick={() => setShowLoginModal(true)}
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-900 text-slate-200 border border-slate-700 hover:bg-slate-800 text-xs font-bold transition-all"
          >
            <User className="w-3.5 h-3.5" /> Login
          </button>

          {/* Start Planning Primary Button */}
          <Link
            to="/plan"
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs shadow-md shadow-cyan-500/20 transition-all"
          >
            Start Planning
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden text-slate-300 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-200 hover:text-cyan-400 py-1"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* Demo Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-800 text-white text-center">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-3">
              <User className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-1">Welcome Traveler</h3>
            <p className="text-xs text-slate-400 mb-6">
              You are currently browsing as a guest. All your custom itineraries are saved locally to your device.
            </p>
            <button
              onClick={() => setShowLoginModal(false)}
              className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Continue Planning
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
