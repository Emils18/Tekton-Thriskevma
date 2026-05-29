'use client';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ClientDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/client/login');
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
      <h1 className="text-2xl md:text-3xl font-bold text-brand-green mb-6 md:mb-8">
        My Project Dashboard
      </h1>

      <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 shadow-xl border border-white/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h2 className="text-lg md:text-xl font-semibold text-brand-green">
            Current Project: Two‑Storey Residence
          </h2>
          <span className="self-start sm:self-auto px-4 py-1 rounded-pill bg-brand-accent/20 text-brand-accent text-sm whitespace-nowrap">
            In Progress
          </span>
        </div>

        <div className="mb-4">
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-4 bg-brand-accent rounded-full w-3/5" />
          </div>
          <p className="text-sm text-gray-500 mt-1">60% complete</p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="p-3 md:p-4 bg-brand-light-green/50 rounded-2xl text-sm md:text-base">
            📅 March 15: Foundation poured
          </div>
          <div className="p-3 md:p-4 bg-brand-light-green/50 rounded-2xl text-sm md:text-base">
            📅 April 2: Framing completed
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-brand-green mb-2 text-sm md:text-base">Documents</h3>
          <div className="flex flex-wrap gap-3">
            <a href="#" className="px-4 py-2 rounded-pill bg-white shadow-sm text-xs md:text-sm hover:shadow-md transition-shadow">
              📄 Contract.pdf
            </a>
            <a href="#" className="px-4 py-2 rounded-pill bg-white shadow-sm text-xs md:text-sm hover:shadow-md transition-shadow">
              📄 Invoice1.pdf
            </a>
          </div>
        </div>

        <div>
          <textarea
            placeholder="Send message to project manager..."
            className="w-full rounded-2xl p-3 border border-white/40 bg-white/70 focus:outline-none text-sm md:text-base"
            rows={3}
          />
          <button className="mt-2 px-6 py-2 bg-brand-green text-white rounded-pill hover:bg-brand-accent transition-colors text-sm md:text-base">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}