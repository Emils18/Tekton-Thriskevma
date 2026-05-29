import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-green text-white mt-20 pt-12 pb-6 rounded-t-[3rem]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-2">Tekton Thriskevma Corp.</h3>
          <p className="text-sm text-white/70">Building with purpose — Mandaue City, Cebu</p>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold">Quick Links</h4>
          <Link href="/services" className="text-white/70 hover:text-white">Services</Link>
          <Link href="/projects" className="text-white/70 hover:text-white">Projects</Link>
          <Link href="/contact" className="text-white/70 hover:text-white">Contact</Link>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold">Contact</h4>
          <p className="text-white/70">Tres Rosas, Alang‑Alang, Mandaue City</p>
          <p className="text-white/70">+63 912 345 6789</p>
        </div>
      </div>
      <div className="border-t border-white/20 mt-8 pt-4 text-center text-sm text-white/50">
        © {new Date().getFullYear()} Tekton Thriskevma Corp. All rights reserved.
      </div>
    </footer>
  );
}