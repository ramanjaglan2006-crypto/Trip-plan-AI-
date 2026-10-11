import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { 
  Compass, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  LogOut,
  MapPin,
  Calendar
} from 'lucide-react';

export function LoginPage() {
  const { currentUser, login, logout, itinerary } = useTripContext();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const getRegisteredUsers = () => {
    try {
      const data = localStorage.getItem('tripwise_registered_users');
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  };

  const saveRegisteredUsers = (users) => {
    localStorage.setItem('tripwise_registered_users', JSON.stringify(users));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (isSignUp && !name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!cleanPassword || cleanPassword.length < 4) {
      setErrorMsg('Password must be at least 4 characters long.');
      return;
    }

    const usersDb = getRegisteredUsers();

    if (isSignUp) {
      // Sign Up Flow
      const cleanName = name.trim();
      const displayName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

      const newUser = {
        name: displayName,
        email: cleanEmail,
        password: cleanPassword,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(cleanName)}`,
        joinedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      };

      usersDb[cleanEmail] = newUser;
      saveRegisteredUsers(usersDb);

      login({
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        joinedAt: newUser.joinedAt,
      });

      setSuccessMsg(`Account created! Welcome, ${newUser.name}. Redirecting...`);
      setTimeout(() => {
        navigate('/plan');
      }, 900);
    } else {
      // Sign In Flow
      const existingUser = usersDb[cleanEmail];

      if (existingUser) {
        if (existingUser.password !== cleanPassword) {
          setErrorMsg('Incorrect password. Please try again.');
          return;
        }

        login({
          name: existingUser.name,
          email: existingUser.email,
          avatar: existingUser.avatar,
          joinedAt: existingUser.joinedAt,
        });

        setSuccessMsg(`Welcome back, ${existingUser.name}! Redirecting...`);
        setTimeout(() => {
          navigate('/plan');
        }, 900);
      } else {
        // If not in database, seamlessly create profile so anyone can log in with their credentials!
        const autoName = cleanEmail.split('@')[0];
        const displayName = autoName.charAt(0).toUpperCase() + autoName.slice(1);

        const newUser = {
          name: displayName,
          email: cleanEmail,
          password: cleanPassword,
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(displayName)}`,
          joinedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        };

        usersDb[cleanEmail] = newUser;
        saveRegisteredUsers(usersDb);

        login({
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
          joinedAt: newUser.joinedAt,
        });

        setSuccessMsg(`Signed in as ${newUser.name}! Redirecting...`);
        setTimeout(() => {
          navigate('/plan');
        }, 900);
      }
    }
  };

  // If already logged in, show user profile card
  if (currentUser) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 animate-fadeIn text-white">
        <div className="bg-slate-900/90 rounded-3xl p-8 border border-slate-800 shadow-2xl text-center space-y-6">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-500 to-emerald-500 p-1 mx-auto shadow-xl shadow-cyan-500/20">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full rounded-[22px] bg-slate-950 object-cover"
              />
            </div>
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-white font-sans">{currentUser.name}</h2>
            <p className="text-sm text-cyan-400 font-medium">{currentUser.email}</p>
            <p className="text-xs text-slate-500 mt-1">Member since {currentUser.joinedAt || '2026'}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-800/80">
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
              <MapPin className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
              <span className="block text-xs font-semibold text-slate-400">Current Trip</span>
              <span className="block text-sm font-bold text-white truncate">
                {itinerary?.trip?.destination || 'None active'}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
              <Calendar className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <span className="block text-xs font-semibold text-slate-400">Days Planned</span>
              <span className="block text-sm font-bold text-white">
                {itinerary?.days?.length || 0} Days
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center pt-2">
            <Link
              to="/plan"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore & Plan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={logout}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-400 border border-slate-700 hover:border-rose-900 font-bold text-xs transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-8 sm:py-12 px-4 animate-fadeIn text-white">
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
        {/* Brand & Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-cyan-500/20">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-xs text-slate-400">
            {isSignUp
              ? 'Enter your details to create an account and plan trips'
              : 'Sign in to access your saved trips and customized itineraries'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-950 border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(false);
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              !isSignUp
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSignUp(true);
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              isSignUp
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{successMsg}</span>
            </div>
          )}

          {isSignUp && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300">Password</label>
              {!isSignUp && (
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to your email.')}
                  className="text-[11px] font-semibold text-cyan-400 hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-0"
              />
              <span>Remember me for 30 days</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 pt-3"
          >
            <span>{isSignUp ? 'Create Free Account' : 'Sign In to TripWise'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          By signing in, you agree to our Terms of Service & Privacy Policy.
        </p>
      </div>
    </div>
  );
}
