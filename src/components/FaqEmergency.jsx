import React from 'react';

const faqs = [
  {
    question: 'Is chatbot advice a final medical diagnosis?',
    answer:
      'No. It provides preliminary guidance only. For treatment decisions, consult a licensed doctor directly.',
  },
  {
    question: 'Can users filter articles by medical category?',
    answer:
      'Yes. You can browse posts by categories like Cardiology, Medicine, Neurology, and more.',
  },
  {
    question: 'Can I upload reports for quick understanding?',
    answer:
      'Yes. Uploading reports helps the platform generate a clearer preliminary summary and doctor suggestion.',
  },
];

const FaqEmergency = () => {
  return (
    <section className="mx-auto mt-8 mb-10 w-[96%] max-w-7xl">
      <div className="grid gap-5 lg:grid-cols-3">
        {faqs.map((item) => (
          <article
            key={item.question}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h3 className="text-lg font-bold text-slate-900">{item.question}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4 sm:p-5">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-rose-700">
          Emergency Notice
        </p>
        <p className="mt-1 text-sm leading-7 text-rose-800">
          If you have chest pain, breathing difficulty, heavy bleeding, stroke signs, or severe allergic reaction,
          contact emergency services or go to the nearest hospital immediately.
        </p>
      </div>
    </section>
  );
};

export default FaqEmergency;
