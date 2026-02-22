import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { currentUser, demoAccounts, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('general@gmail.com');
  const [error, setError] = useState('');

  if (currentUser) {
    const redirectTo = location.state?.from?.pathname || '/';
    return <Navigate to={redirectTo} replace />;
  }

  const handleLogin = (event) => {
    event.preventDefault();
    const result = login(email);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    const redirectTo = location.state?.from?.pathname || '/';
    navigate(redirectTo, { replace: true });
  };

  return (
    <section className="mx-auto w-[96%] max-w-xl py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Demo Login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Use one of the demo accounts to test role-based navigation.
        </p>

        <div className="mt-4 space-y-2 text-sm text-slate-700">
          {demoAccounts.map((account) => (
            <p key={account.email}>
              <span className="font-semibold">{account.role === 'doctor' ? 'Doctor' : 'General'}:</span>{' '}
              {account.email}
            </p>
          ))}
        </div>

        <form onSubmit={handleLogin} className="mt-5 space-y-3">
          <label className="block text-sm font-semibold text-slate-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none ring-emerald-500 focus:ring-2"
            placeholder="general@gmail.com"
          />

          {error && <p className="text-sm font-medium text-rose-600">{error}</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setEmail('dr@gmail.com')}
              className="rounded-lg border border-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50"
            >
              Use Doctor Demo
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
