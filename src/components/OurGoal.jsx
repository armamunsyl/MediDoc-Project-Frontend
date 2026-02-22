import React from 'react';

const categories = ['Cardiology', 'Medicine', 'Neurology', 'Dermatology', 'Pediatrics'];

const highlights = [
  {
    title: 'Community-Powered Learning',
    description:
      'Intern doctors publish practical posts and medical write-ups so anyone can learn from verified knowledge in simple language.',
  },
  {
    title: 'Category-Wise Reading',
    description:
      'Readers can filter content by specialty such as Cardiology and Medicine to quickly find relevant, focused guidance.',
  },
  {
    title: 'AI Chatbot + Doctor Insight',
    description:
      'The chatbot provides instant support, compares answers with intern doctor posts, and suggests which specialist to consult next.',
  },
  {
    title: 'Report-Based Suggestions',
    description:
      'Users can upload reports and receive structured preliminary suggestions to understand the next best step before visiting a doctor.',
  },
];

const OurGoal = () => {
  return (
    <section className="mx-auto mt-8 w-[96%] max-w-7xl rounded-2xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/50 to-cyan-50/40 p-6 shadow-sm sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <p className="mb-3 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Our Goal
          </p>
          <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
            MediDoc is a Medical Knowledge Community for Everyone
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            MediDoc connects intern doctors and everyday people in one trusted platform. Intern doctors share practical medical posts, while users explore verified insights, ask questions, and receive intelligent support through our chatbot experience.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-sm font-semibold text-emerald-700"
              >
                {category}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-600"
            >
              Explore Community
            </button>
            <button
              type="button"
              className="rounded-lg border border-emerald-500 px-5 py-2.5 text-sm font-bold text-emerald-600 transition hover:bg-emerald-50"
            >
              Try Chatbot
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-emerald-400 bg-emerald-500 p-4 shadow-sm"
            >
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/95">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurGoal;
