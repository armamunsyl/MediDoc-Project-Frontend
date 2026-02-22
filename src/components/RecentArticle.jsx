import React from 'react';
import { Link } from 'react-router-dom';
import medicalProfiles from '../data/medicalProfiles.json';
import posts from '../data/posts.json';

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path
      d="M12 20.25s-6.75-4.35-9-8.25C1.5 9 3 5.25 6.75 5.25c2.1 0 3.3 1.05 4.2 2.25.9-1.2 2.1-2.25 4.2-2.25C19 5.25 20.5 9 21 12c-2.25 3.9-9 8.25-9 8.25Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CommentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path
      d="M7 9h10M7 13h6m8 8-4-2H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v14Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SaveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path
      d="M6 3.75h12a1.5 1.5 0 0 1 1.5 1.5V21L12 16.5 4.5 21V5.25a1.5 1.5 0 0 1 1.5-1.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RecentArticle = () => {
  const profileIdByAuthor = new Map(
    medicalProfiles.map((profile) => [profile.name, profile.profileId]),
  );
  const latestThreePosts = posts.slice(0, 3);

  return (
    <section className="mx-auto mt-8 w-[96%] max-w-7xl">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Recent Article
          </p>
          <h2 className="mt-1 text-3xl font-extrabold text-slate-900">
            Latest Medical Community Posts
          </h2>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {latestThreePosts.map((post) => (
          <article
            key={post.postId}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <header className="flex items-start gap-3">
              {profileIdByAuthor.get(post.authorName) ? (
                <Link to={`/dr-profile/${profileIdByAuthor.get(post.authorName)}`}>
                  <img
                    src={post.authorImage}
                    alt={`${post.authorName} avatar`}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                </Link>
              ) : (
                <img
                  src={post.authorImage}
                  alt={`${post.authorName} avatar`}
                  className="h-11 w-11 rounded-full object-cover"
                />
              )}
              <div className="min-w-0">
                {profileIdByAuthor.get(post.authorName) ? (
                  <Link
                    to={`/dr-profile/${profileIdByAuthor.get(post.authorName)}`}
                    className="truncate text-base font-bold text-slate-900 transition hover:text-emerald-600"
                  >
                    {post.authorName}
                  </Link>
                ) : (
                  <h3 className="truncate text-base font-bold text-slate-900">
                    {post.authorName}
                  </h3>
                )}
                <p className="text-sm font-medium text-emerald-600">
                  {post.designation} • {post.affiliation}
                </p>
                <p className="text-xs text-slate-500">
                  {post.authorLocation} • {post.postedTime}
                </p>
              </div>
            </header>

            <div className="mt-4">
              <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                {post.category}
              </span>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                {post.mainPostBody}
              </p>
            </div>

            <footer className="mt-4 flex items-center gap-3 border-t border-slate-200 pt-3">
              <button
                type="button"
                className="rounded-full p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-500"
                aria-label="Love post"
              >
                <HeartIcon />
              </button>
              <button
                type="button"
                className="rounded-full p-2 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-600"
                aria-label="Comment on post"
              >
                <CommentIcon />
              </button>
              <button
                type="button"
                className="rounded-full p-2 text-slate-500 transition hover:bg-sky-50 hover:text-sky-600"
                aria-label="Save post"
              >
                <SaveIcon />
              </button>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecentArticle;
