import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Eye, EyeOff, LogIn, Sun, Moon, Shield, User } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (userType) => {
    if (userType === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else {
      setUsername('operator1');
      setPassword('emp123');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 dark:bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-4 relative transition-colors duration-300">
      {/* Top Right Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={toggleTheme}
          className="p-3 rounded-2xl bg-white/10 dark:bg-slate-800/80 hover:bg-white/20 dark:hover:bg-slate-700/80 text-white dark:text-amber-400 backdrop-blur-md border border-white/10 dark:border-slate-700 transition-all duration-300 cursor-pointer flex items-center gap-2 text-xs font-semibold shadow-lg"
        >
          {isDark ? (
            <>
              <Sun size={18} className="text-amber-400 animate-spin-slow" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon size={18} className="text-indigo-400" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative w-full max-w-md animate-slide-up my-8">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-700 text-white shadow-2xl shadow-indigo-500/30 mb-4 border border-indigo-400/30">
            <span className="font-extrabold text-2xl tracking-wider">SATA VIKAS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Production &amp; TPM Tracker</h1>
          <p className="text-xs sm:text-sm text-indigo-300 font-medium mt-1">Sata Vikas India Pvt Ltd · Palwal Plant</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-white/15 dark:border-slate-800 shadow-2xl p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">Sign In</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">Enter your credentials to access shop-floor logs</p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-2xl bg-red-500/20 border border-red-500/30 text-red-200 text-xs font-semibold animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5 uppercase tracking-wider">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/15 text-white
                           placeholder:text-slate-500 text-sm
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400
                           transition-all duration-200"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-slate-950/60 border border-white/15 text-white
                             placeholder:text-slate-500 text-sm
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400
                             transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl
                         bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-700 text-white font-bold text-sm
                         hover:from-indigo-500 hover:to-indigo-600
                         focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900
                         disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-xl shadow-indigo-600/30 hover:shadow-2xl hover:shadow-indigo-600/50
                         transition-all duration-200 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill Buttons */}
          <div className="mt-6 pt-5 border-t border-white/15">
            <p className="text-xs font-semibold text-slate-300 text-center mb-2.5">Quick Demo Login</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('admin')}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-semibold transition-all cursor-pointer"
              >
                <Shield size={14} className="text-indigo-400" />
                Fill Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('employee')}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 text-emerald-200 text-xs font-semibold transition-all cursor-pointer"
              >
                <User size={14} className="text-emerald-400" />
                Fill Employee
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6">
          © 2026 Sata Vikas India Pvt Ltd. Hourly Production & TPM Tracker.
        </p>
      </div>
    </div>
  );
}

