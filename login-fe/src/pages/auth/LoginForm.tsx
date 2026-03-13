import React, {  useActionState, useEffect, useRef } from 'react';

import { User, Lock, Loader2, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { action } from './utils/actions';
import { login } from '@/state/user/userSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/state/useAppDispatch';
import type { RootState } from '@/state/store';


const LoginForm: React.FC= () => {
  const formRef = useRef<HTMLFormElement>(null);

const [state, formAction] = useActionState( action, null);

const loading = useSelector((state: RootState) => state.user.isPending);
const error = useSelector((state: RootState) => state.user.message);
const dispatch = useAppDispatch();

console.log('LoginForm state:', state);

useEffect(() => {
  if (state?.formData) {
    dispatch(login(state.formData));
  }
}, [state]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 p-8 text-center">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto backdrop-blur-sm mb-4">
            <LogIn className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-white">Dobrodošli</h1>
          <p className="text-indigo-100 text-sm mt-1">Unesite podatke za pristup</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form 
          noValidate
            ref={formRef}
            action={formAction}
            className="space-y-5">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded text-sm text-red-700 animate-pulse">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 ml-1">Email adresa</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="admin@test.com"
                />

                {state?.errors?.email && (<p className="text-red-600 text-xs mt-1">{state.errors.email}</p>)}
              </div>
            </div>


            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 ml-1">Lozinka</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="sifra123"
                />
                {state?.errors?.password && (<p className="text-red-600 text-xs mt-1">{state.errors.password}</p>)}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || undefined}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ${
                loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" /> Provera...
                </>
              ) : (
                'Prijavi se'
              )}
            </button>
            <Link to="/register" className="block text-center text-sm text-indigo-600 hover:text-indigo-800 mt-4">
              Nemate nalog? Registrujte se
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;