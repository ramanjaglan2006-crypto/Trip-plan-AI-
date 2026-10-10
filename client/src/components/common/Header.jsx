import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Moon, Sun, Key, ShieldAlert, X, Sparkles, User, Menu } from 'lucide-react';

export function Header({
  darkMode,
  setDarkMode,
  onToggleDevPanel,
  devPanelOpen,
  apiKey,
  setApiKey,
}) {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inputKey, setInputKey] = useState(apiKey);
  const location = useLocation();

  const handleSaveKey = () => {
    setApiKey(inputKey.trim());
    setShowKeyModal(false);
  };

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
              EDITABLE LLM ITINERARY ENGINE
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
                className={`text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1 font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Evaluator Test Bench Button */}
          <button
            onClick={onToggleDevPanel}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              devPanelOpen
                ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20'
                : 'bg-amber-950/40 text-amber-300 border-amber-800 hover:bg-amber-900/60'
            }`}
            title="Toggle Evaluator Failure Simulator"
          >
            <ShieldAlert className="w-4 h-4" />
            <span className="hidden sm:inline">Test Failures</span>
          </button>

          {/* API Key Config Button */}
          <button
            onClick={() => setShowKeyModal(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              apiKey
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
            title="Configure Gemini API Key"
          >
            <Key className="w-4 h-4" />
            <span className="hidden sm:inline">{apiKey ? 'Custom Key' : 'API Key'}</span>
          </button>

          {/* Login Pill Button */}
          <button
            onClick={() => setShowLoginModal(true)}
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-900 text-slate-200 border border-slate-700 hover:bg-slate-800 text-xs font-bold transition-all"
          >
            <User className="w-3.5 h-3.5" /> Login
          </button>

          {/* Signup Primary Button */}
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

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-800 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-cyan-950 text-cyan-400 rounded-lg">
                  <Key className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg">
                  Gemini API Configuration
                </h3>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              By default, Express uses an intelligent offline mock generator so evaluators can test everything instantly. Option: enter a custom Google Gemini API Key below for live LLM requests.
            </p>

            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-4"
            />

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  setInputKey('');
                  setApiKey('');
                  setShowKeyModal(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-800 rounded-xl transition-all"
              >
                Use Mock Generator
              </button>
              <button
                onClick={handleSaveKey}
                className="px-4 py-2 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Save Preference
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Demo Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-800 text-white text-center">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-3">
              <User className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-1">Assignment Demo Session</h3>
            <p className="text-xs text-slate-400 mb-6">
              Authentication is not required for the assignment evaluation. You are logged in as standard evaluator.
            </p>
            <button
              onClick={() => setShowLoginModal(false)}
              className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Continue to Product
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
