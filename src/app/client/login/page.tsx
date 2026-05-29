'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';

const bgImage = 'https://images.pexels.com/photos/3862375/pexels-photo-3862375.jpeg?auto=compress&cs=tinysrgb&w=1350';

export default function AuthPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const { login, register } = useAuth();
  const router = useRouter();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginEmail, loginPassword);
    router.push('/client/dashboard');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    register(regName, regEmail, regPassword);
    router.push('/client/dashboard');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-brand-light-green">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-tl from-brand-green/90 via-brand-green/60 to-brand-accent/30" />
      </div>

      {/* Floating decorative blobs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-brand-accent/20 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"
        animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-40 h-40 bg-brand-green/30 rounded-full blur-xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Form card */}
      <motion.div
        className="relative z-10 w-full max-w-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Tab switcher – pill inside glass */}
        <div className="flex mb-6 bg-white/20 backdrop-blur-lg rounded-full p-1 border border-white/30 shadow-2xl">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-3 rounded-full text-center font-bold transition-all duration-300 ${
              tab === 'login'
                ? 'bg-white text-brand-green shadow-lg scale-105'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-3 rounded-full text-center font-bold transition-all duration-300 ${
              tab === 'register'
                ? 'bg-white text-brand-green shadow-lg scale-105'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form container */}
        <AnimatePresence mode="wait">
          {tab === 'login' && (
            <motion.form
              key="login"
              onSubmit={handleLogin}
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-8 shadow-2xl border border-white/50 space-y-6"
            >
              <motion.div
                className="w-16 h-16 mx-auto bg-brand-green/10 rounded-full flex items-center justify-center mb-2"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <svg className="w-8 h-8 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </motion.div>
              <h2 className="text-2xl font-bold text-brand-green text-center">Welcome Back</h2>
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="w-full rounded-pill px-6 py-3 bg-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-brand-accent transition"
              />
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="w-full rounded-pill px-6 py-3 bg-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-brand-accent transition"
              />
              <motion.button
                type="submit"
                className="w-full bg-brand-green text-white py-3 rounded-pill font-semibold hover:bg-brand-accent transition-colors relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Sign In</span>
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-pill"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>
              <p className="text-center text-sm text-gray-600 mt-4">
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setTab('register')}
                  className="text-brand-accent underline font-medium hover:text-brand-green transition"
                >
                  Create one
                </button>
              </p>
            </motion.form>
          )}

          {tab === 'register' && (
            <motion.form
              key="register"
              onSubmit={handleRegister}
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-8 shadow-2xl border border-white/50 space-y-6"
            >
              <motion.div
                className="w-16 h-16 mx-auto bg-brand-accent/10 rounded-full flex items-center justify-center mb-2"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <svg className="w-8 h-8 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </motion.div>
              <h2 className="text-2xl font-bold text-brand-green text-center">Create Account</h2>
              <input
                type="text"
                placeholder="Full Name"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                required
                className="w-full rounded-pill px-6 py-3 bg-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-brand-accent transition"
              />
              <input
                type="email"
                placeholder="Email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
                className="w-full rounded-pill px-6 py-3 bg-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-brand-accent transition"
              />
              <input
                type="password"
                placeholder="Password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
                className="w-full rounded-pill px-6 py-3 bg-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-brand-accent transition"
              />
              <motion.button
                type="submit"
                className="w-full bg-brand-green text-white py-3 rounded-pill font-semibold hover:bg-brand-accent transition-colors relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Sign Up</span>
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-pill"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>
              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setTab('login')}
                  className="text-brand-accent underline font-medium hover:text-brand-green transition"
                >
                  Sign in
                </button>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}