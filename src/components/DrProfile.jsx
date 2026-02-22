import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import medicalProfiles from '../data/medicalProfiles.json';
import posts from '../data/posts.json';

const DrProfile = () => {
  const { profileId } = useParams();
  const profile = medicalProfiles.find((item) => item.profileId === profileId);
  const profilePosts = useMemo(
    () => posts.filter((post) => post.authorName === profile?.name),
    [profile],
  );
  const firstName = profile?.name.replace(/^Dr\.\s*/, '').split(' ')[0] || 'Doctor';

  const profileNumber = Number(profileId?.split('-')?.[1] || 1);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(1200 + profileNumber * 73);

  const handleFollowToggle = () => {
    setIsFollowing((prev) => !prev);
    setFollowersCount((prev) => (isFollowing ? prev - 1 : prev + 1));
  };

  if (!profile) {
    return (
      <section className="mx-auto w-[96%] max-w-5xl py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-extrabold text-slate-900">Profile Not Found</h1>
          <p className="mt-2 text-slate-600">
            The requested doctor/intern profile does not exist.
          </p>
          <Link
            to="/recent-blog"
            className="mt-5 inline-flex rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            Back to Recent Blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-[96%] max-w-5xl py-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="h-24 w-24 rounded-full border-2 border-emerald-200 object-cover"
          />

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
              {profile.profileId}
            </p>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900">
              {profile.name}
            </h1>
            <p className="mt-1 text-sm font-semibold text-emerald-600">
              {profile.designation} • {profile.specialization}
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-600">{profile.bio}</p>
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={handleFollowToggle}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  isFollowing
                    ? 'border border-emerald-500 bg-white text-emerald-600 hover:bg-emerald-50'
                    : 'bg-emerald-500 text-white hover:bg-emerald-600'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              <p className="text-sm font-medium text-slate-600">
                {followersCount.toLocaleString()} followers
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Affiliation</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{profile.affiliation}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Location</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{profile.location}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Email</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{profile.email}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Phone</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{profile.phone}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Social Media
          </p>
          <div className="mt-3 flex items-center gap-3">
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-emerald-400 hover:text-emerald-600"
              aria-label="Facebook profile"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M13.5 9H16V6h-2.5C11.57 6 10 7.57 10 9.5V12H8v3h2v6h3v-6h2.5l.5-3H13v-2.5c0-.28.22-.5.5-.5Z" />
              </svg>
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-emerald-400 hover:text-emerald-600"
              aria-label="LinkedIn profile"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M6.5 8a1.75 1.75 0 1 1 0-3.5A1.75 1.75 0 0 1 6.5 8ZM5 9h3v10H5V9Zm5 0h2.9v1.37h.04c.4-.76 1.38-1.56 2.84-1.56C18.82 8.81 20 10.1 20 12.48V19h-3v-5.77c0-1.38-.02-3.15-1.92-3.15-1.93 0-2.23 1.5-2.23 3.05V19h-3V9Z" />
              </svg>
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-emerald-400 hover:text-emerald-600"
              aria-label="X profile"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M18.9 3H21l-4.6 5.26L22 21h-4.5l-3.52-4.64L9.9 21H7.8l4.92-5.62L2 3h4.62l3.18 4.2L13.56 3h2.1L10.75 8.6 18.9 19h-1.3l-8.8-11.2L18.9 3Z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-extrabold text-slate-900">
            {firstName}&apos;s Posts
          </h2>
          <div className="mt-3 space-y-3">
            {profilePosts.length > 0 ? (
              profilePosts.map((post) => (
                <article
                  key={post.postId}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-500">{post.postedTime}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{post.mainPostBody}</p>
                </article>
              ))
            ) : (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                No posts found for this profile yet.
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Link
            to="/recent-blog"
            className="inline-flex rounded-lg border border-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50"
          >
            Back to Posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DrProfile;
