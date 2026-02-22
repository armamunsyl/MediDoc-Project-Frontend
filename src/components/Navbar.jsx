import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import posts from '../data/posts.json';

const navClass = ({ isActive }) =>
  `border-b-[3px] pb-1 transition-colors ${
    isActive
      ? 'border-emerald-500 text-emerald-500'
      : 'border-transparent text-slate-900 hover:border-emerald-400 hover:text-emerald-500'
  }`;

const Navbar = () => {
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [postCategory, setPostCategory] = useState('');
  const [postBody, setPostBody] = useState('');
  const [showPostedToast, setShowPostedToast] = useState(false);
  const profileMenuRef = useRef(null);
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const categories = useMemo(
    () => [...new Set(posts.map((post) => post.category))],
    [],
  );

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setOpenProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleLogout = () => {
    logout();
    setOpenProfileMenu(false);
    navigate('/');
  };

  const handlePostSubmit = (event) => {
    event.preventDefault();
    if (!postCategory || !postBody.trim()) return;

    setOpenPostModal(false);
    setPostCategory('');
    setPostBody('');
    setShowPostedToast(true);
    setTimeout(() => setShowPostedToast(false), 1800);
  };

  const modalPortal =
    openPostModal && typeof document !== 'undefined'
      ? createPortal(
          <div className="fixed inset-0 z-[999] grid place-items-center bg-black/40 p-4">
            <div className="max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-5 shadow-xl">
              <h2 className="text-lg font-extrabold text-slate-900">Create Post</h2>
              <p className="mt-1 text-sm text-slate-500">
                Select category and write your post content.
              </p>

              <form onSubmit={handlePostSubmit} className="mt-4 space-y-3">
                <div>
                  <label htmlFor="post-category" className="mb-1 block text-sm font-semibold text-slate-700">
                    Category
                  </label>
                  <select
                    id="post-category"
                    value={postCategory}
                    onChange={(event) => setPostCategory(event.target.value)}
                    className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none ring-emerald-500 focus:ring-2"
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="post-body" className="mb-1 block text-sm font-semibold text-slate-700">
                    Body
                  </label>
                  <textarea
                    id="post-body"
                    rows={4}
                    value={postBody}
                    onChange={(event) => setPostBody(event.target.value)}
                    placeholder="Write post content..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setOpenPostModal(false)}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )
      : null;

  const toastPortal =
    showPostedToast && typeof document !== 'undefined'
      ? createPortal(
          <div className="fixed inset-0 z-[1000] grid place-items-center bg-black/30 p-4">
            <div className="w-full max-w-md rounded-2xl bg-emerald-600 px-6 py-5 text-center text-white shadow-2xl">
              <p className="text-lg font-bold sm:text-xl">
                Your post is posted in community
              </p>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <header className="sticky top-0 z-50 w-full border-y border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src="/MadiDoc.png" alt="MediDoc logo" className="h-7 w-auto" />
          <h1 className="text-2xl font-extrabold leading-none tracking-tight">
            <span className="text-emerald-400">Medi</span>
            <span className="text-black-600">Doc</span>
          </h1>
        </Link>

        <ul className="hidden items-center gap-9 text-base font-semibold lg:flex">
          <li>
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/recent-blog" className={navClass}>
              Recent Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/chatbot" className={navClass}>
              Chatbot
            </NavLink>
          </li>
          <li>
            <a href="#" className="text-slate-900 transition-colors hover:text-emerald-500">
              Medical Near me
            </a>
          </li>
          {currentUser?.role === 'doctor' && (
            <li>
              <button
                type="button"
                onClick={() => setOpenPostModal(true)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-xl font-bold text-white transition hover:bg-emerald-600"
                aria-label="Create post"
                title="Create post"
              >
                +
              </button>
            </li>
          )}
        </ul>

        {currentUser ? (
          <div className="relative flex items-center" ref={profileMenuRef}>
            <button
              type="button"
              onClick={() => setOpenProfileMenu((prev) => !prev)}
              className="rounded-full"
              aria-label="Open profile menu"
            >
              <img
                src={currentUser.avatar}
                alt="User avatar"
                className="h-10 w-10 rounded-full border-2 border-emerald-500 object-cover"
              />
            </button>

            {openProfileMenu && (
              <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
                <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                <p className="mt-1 text-xs text-slate-500">{currentUser.email}</p>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-3 w-full rounded-lg bg-rose-50 px-3 py-2 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            state={{ from: location }}
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            Login
          </Link>
        )}
      </nav>

      {modalPortal}
      {toastPortal}
    </header>
  );
};

export default Navbar;
