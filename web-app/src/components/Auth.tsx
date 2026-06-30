import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';

interface AuthProps {
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

export function Auth({ onLoginSuccess }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    const apiBase = import.meta.env.VITE_API_URL || import.meta.env.VITE_API || 'http://127.0.0.1:5005';
    const url = isLogin 
      ? `${apiBase}/api/auth/login` 
      : `${apiBase}/api/auth/register`;

    const payload = isLogin 
      ? { email, password } 
      : { name, email, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Authentication failed');
        setLoading(false);
        return;
      }

      setLoading(false);
      onLoginSuccess(data.user);
    } catch (err) {
      console.error('Authentication connection error:', err);
      setError('Cannot connect to the backend server. Make sure the API server is running on port 5000.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f1ec] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Decorative Gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[3px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center p-3 bg-white border border-[#e8e4de] rounded-full shadow-sm mb-4">
          <Sparkles className="h-6 w-6 text-[#c5a059]" />
        </div>
        <h2 className="text-3xl font-serif text-[#1a1a1a] tracking-tight">
          {isLogin ? 'Welcome back' : 'Create your account'}
        </h2>
        <p className="mt-2 text-sm text-[#888] font-medium uppercase tracking-wider">
          Elegance Resume Designer
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-[#e8e4de] shadow-sm rounded-sm sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-sm bg-red-50 border border-red-200 p-3.5 text-xs text-red-600 font-medium">
                {error}
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="text-[10px] uppercase tracking-[0.15em] text-[#888] font-semibold block mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-[#bbb]" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="block w-full pl-10 pr-3 py-2.5 bg-transparent border border-[#e0dbd2] rounded-sm text-xs outline-none focus:border-[#c5a059] transition-colors text-[#333] placeholder:text-[#ccc]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[10px] uppercase tracking-[0.15em] text-[#888] font-semibold block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-[#bbb]" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.morgan@example.com"
                  className="block w-full pl-10 pr-3 py-2.5 bg-transparent border border-[#e0dbd2] rounded-sm text-xs outline-none focus:border-[#c5a059] transition-colors text-[#333] placeholder:text-[#ccc]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.15em] text-[#888] font-semibold block mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-[#bbb]" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-2.5 bg-transparent border border-[#e0dbd2] rounded-sm text-xs outline-none focus:border-[#c5a059] transition-colors text-[#333] placeholder:text-[#ccc]"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-sm text-xs font-semibold text-white bg-[#1a1a1a] hover:bg-[#333] focus:outline-none focus:ring-1 focus:ring-[#c5a059] disabled:opacity-50 transition-all uppercase tracking-wider"
              >
                {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Register'}
                {!loading && <ArrowRight className="h-3.5 w-3.5" />}
              </button>
            </div>
          </form>

          <div className="mt-6 border-t border-[#f4f1ec] pt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-xs text-[#c5a059] hover:text-[#a38040] font-semibold transition-colors uppercase tracking-wider"
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : 'Already have an account? Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
