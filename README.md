# Tekton Thriskevma Corp. – Website

Premium construction company website built with Next.js, Tailwind CSS, Framer Motion, AI chatbot, and a client portal.

## Features

- **Modern design** – oval cards, glassmorphism, green palette, smooth animations
- **AI Assistant** – powered by Groq (Llama 3.1), answers client questions and captures leads
- **Client Portal** – login/register, project dashboard, document access
- **Admin Workspace** – lead management, contact form submissions
- **Contact Form** – sends emails via Resend API
- **Fully Responsive** – works on all devices

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 3
- Framer Motion
- Groq API (AI chat)
- Resend (email delivery)

## Database Required

This project currently uses mock data. To make it fully functional, you need a PostgreSQL database.

### Setup Database (PostgreSQL)

1. Create a free PostgreSQL database on [Neon](https://neon.tech) or [Supabase](https://supabase.com).
2. Add your database connection string to `.env.local`:
