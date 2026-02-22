import React from 'react';

const categories = [
  {
    name: 'Cardiology',
    description: 'Heart health, blood pressure, and preventive care insights.',
    postCount: 148,
  },
  {
    name: 'Medicine',
    description: 'General medicine discussions and practical treatment guidance.',
    postCount: 221,
  },
  {
    name: 'Neurology',
    description: 'Nervous system topics including migraine and stroke awareness.',
    postCount: 97,
  },
  {
    name: 'Dermatology',
    description: 'Skin conditions, routines, and evidence-based care tips.',
    postCount: 114,
  },
];

const FeaturedCategories = () => {
  return (
    <section className="mx-auto mt-8 w-[96%] max-w-7xl">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
           
          </p>
          <h2 className="mt-1 text-3xl font-extrabold text-slate-900">
            Browse Medical Topics
          </h2>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <article
            key={category.name}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h3 className="text-lg font-bold text-slate-900">{category.name}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
            <p className="mt-4 text-sm font-semibold text-emerald-600">
              {category.postCount}+ posts
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
