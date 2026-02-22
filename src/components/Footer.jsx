import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-emerald-100 bg-slate-950 text-slate-200">
      <div className="mx-auto grid w-[96%] max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <img src="/MadiDoc.png" alt="MediDoc logo" className="h-8 w-auto" />
            <h3 className="text-2xl font-extrabold tracking-tight">
              <span className="text-emerald-400">Medi</span>
              <span className="text-white-400">Doc</span>
            </h3>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
            A trusted medical community where intern doctors and experts share insights,
            and patients explore reliable health knowledge with AI-assisted guidance.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li><a href="#" className="transition hover:text-emerald-300">Recent Blog</a></li>
            <li><a href="#" className="transition hover:text-emerald-300">Chatbot</a></li>
            <li><a href="#" className="transition hover:text-emerald-300">Dashboard</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
            Contact
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>support@MediDoc.com</li>
            <li>Dhaka, Bangladesh</li>
            <li>+880 1700-000000</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex w-[96%] max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {currentYear} MediDoc. All rights reserved.</p>
          <p>Medical content is for awareness only and not a replacement for emergency care.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
