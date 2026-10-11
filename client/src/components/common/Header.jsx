import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTripContext } from '../../context/TripContext';
import { Compass, User, Menu, X } from 'lucide-react';

export function Header() {
  const { currentUser } = useTripContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Explore & Plan', path: '/plan' },
    { label: 'Current Itinerary', path: '/itinerary' },
    { label: 'My Trips', path: '/my-trips' },
    { label: 'About & Contact', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#080D1B]/90 backdrop-blur-md border-b border-[#29354B] text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-xl p-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white uppercase font-sans">
                TRIPWISE <span className="text-[#22D3EE]">AI</span>
              </span>
            </div>
            <p className="text-[10px] text-[#94A3B8] tracking-widest font-semibold uppercase hidden sm:block">
              EDITABLE ITINERARY ENGINE
            </p>
          </div>
        </Link>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-[#111A2E]/70 p-1.5 rounded-full border border-[#29354B]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-semibold transition-all px-4 py-2 rounded-full ${
                  isActive
                    ? 'text-[#22D3EE] bg-[#19243A] border border-cyan-800/50 shadow-sm'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#19243A]/50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Profile / Login & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <Link
              to="/login"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111A2E] text-slate-200 border border-[#29354B] hover:border-[#22D3EE] text-xs font-semibold transition-all group shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              title="View Account Profile"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-5 h-5 rounded-full bg-[#080D1B] object-cover"
              />
              <span className="text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors">
                {currentUser.name.split(' ')[0]}
              </span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111A2E] text-[#F8FAFC] border border-[#29354B] hover:bg-[#19243A] hover:border-cyan-700/60 text-xs font-semibold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <User className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>Login</span>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden text-slate-300 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#29354B] bg-[#080D1B] p-4 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-semibold py-2 px-3 rounded-xl transition-all ${
                  isActive
                    ? 'text-[#22D3EE] bg-[#111A2E] border border-cyan-800/40'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#111A2E]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-[#29354B]">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold text-[#22D3EE] py-2 px-3 rounded-xl hover:bg-[#111A2E]"
            >
              {currentUser ? `Profile (${currentUser.name})` : 'Login / Sign Up'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
