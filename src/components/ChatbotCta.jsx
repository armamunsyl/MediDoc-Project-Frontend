import React from 'react';

const ChatbotCta = () => {
  return (
    <section className="mx-auto mt-8 w-[96%] max-w-7xl rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-500 to-emerald-400 p-6 text-white shadow-sm sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-100">
        
          </p>
          <h2 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
            Get instant health guidance and specialist suggestions
          </h2>
          <p className="mt-3 text-sm leading-7 text-emerald-50 sm:text-base">
            Share symptoms or upload report context. The chatbot responds from medical knowledge,
            compares relevant intern-doctor posts, and suggests which specialist you may need.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <button
            type="button"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-emerald-600 transition hover:bg-emerald-50"
          >
            Start Chatbot
          </button>
          <button
            type="button"
            className="rounded-lg border border-white/80 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Upload Report
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChatbotCta;
