'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle, X } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const closeSuccess = () => setStatus('idle');

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-brand-green text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Let&apos;s Talk
      </motion.h1>

      {/* Quick Contact Cards */}
      <motion.div
        className="grid md:grid-cols-3 gap-6 mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        {[
          {
            icon: <Phone className="w-6 h-6" />,
            title: 'Call Us',
            detail: '+63 912 345 6789',
            sub: 'Mon‑Sat 8am‑5pm',
            action: 'tel:+639123456789',
            btnText: 'Call Now',
          },
          {
            icon: <Mail className="w-6 h-6" />,
            title: 'Email Us',
            detail: 'info@tektonthriskevma.com',
            sub: 'We reply within 24h',
            action: 'mailto:info@tektonthriskevma.com',
            btnText: 'Send Email',
          },
          {
            icon: <MapPin className="w-6 h-6" />,
            title: 'Visit Us',
            detail: 'Tres Rosas, Alang‑Alang',
            sub: 'Mandaue City, Cebu',
            action: 'https://maps.google.com/?q=Tres+Rosas+Alang-Alang+Mandaue+City',
            btnText: 'Open Map',
          },
        ].map((card, idx) => (
          <motion.div
            key={idx}
            className="bg-white/60 backdrop-blur-sm rounded-[3rem] p-6 shadow-md border border-white/50 text-center flex flex-col items-center"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-14 h-14 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-4">
              {card.icon}
            </div>
            <h3 className="font-semibold text-xl text-brand-green mb-1">{card.title}</h3>
            <p className="text-brand-green/80 font-medium">{card.detail}</p>
            <p className="text-sm text-gray-500 mb-4">{card.sub}</p>
            <a
              href={card.action}
              target={card.title === 'Visit Us' ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-pill bg-brand-green text-white text-sm hover:bg-brand-accent transition-colors"
            >
              {card.btnText}
            </a>
          </motion.div>
        ))}
      </motion.div>

      {/* Contact Form */}
      <motion.div
        className="max-w-3xl mx-auto bg-white/60 backdrop-blur-sm rounded-[4rem] p-8 md:p-12 shadow-xl border border-white/50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-brand-green text-center mb-8">Or Send a Message</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" placeholder="Full Name" value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })} required
            className="w-full rounded-pill px-6 py-3 bg-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-brand-accent" />
          <input type="email" placeholder="Email" value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })} required
            className="w-full rounded-pill px-6 py-3 bg-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-brand-accent" />
          <input type="tel" placeholder="Phone" value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-pill px-6 py-3 bg-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-brand-accent" />
          <textarea rows={5} placeholder="Tell us about your project..." value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })} required
            className="w-full rounded-[2rem] px-6 py-3 bg-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-brand-accent" />
          <motion.button type="submit" disabled={status === 'loading'}
            className="w-full bg-brand-green text-white py-3 rounded-pill font-semibold hover:bg-brand-accent transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </motion.button>
          {status === 'error' && <p className="text-center text-red-500">Something went wrong. Please try again.</p>}
        </form>
      </motion.div>

      {/* Map – reliable embed */}
      <motion.div
        className="mt-16 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-brand-green text-center mb-6">Find Us</h2>
        <div className="rounded-[3rem] overflow-hidden shadow-xl border border-white/50 h-80 md:h-96">
          <iframe
            src="https://maps.google.com/maps?q=Tres+Rosas+Alang-Alang+Mandaue+City&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </motion.div>

      {/* Success Modal – unchanged */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeSuccess}
          >
            <motion.div
              className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl max-w-md w-full text-center relative"
              initial={{ scale: 0.5, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={closeSuccess} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-24 h-24 mx-auto bg-brand-accent/10 rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle className="w-12 h-12 text-brand-accent" />
              </motion.div>
              <motion.h2 className="text-2xl font-bold text-brand-green mb-2"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>Message Sent!</motion.h2>
              <motion.p className="text-gray-600 mb-6"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                Thank you for reaching out. We&apos;ll get back to you within 24 hours.
              </motion.p>
              <motion.button onClick={closeSuccess}
                className="px-6 py-3 bg-brand-green text-white rounded-pill font-medium hover:bg-brand-accent transition-colors"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Close</motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}