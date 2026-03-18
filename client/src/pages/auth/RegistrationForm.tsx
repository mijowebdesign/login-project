import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { User, Mail, Lock, Loader2, UserPlus } from 'lucide-react';
import {register } from '@/services/authService';
import type { RegisterRequest } from '@/services/authService';


const RegistrationForm: React.FC = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

   const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

   const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister(formData);
  };

   const handleRegister = async (formData: RegisterRequest) => {
    setLoading(true);
    setError(null);
    try {
      await register(formData);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Greška pri registraciji.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-blue-600 p-8 text-center text-white">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <UserPlus size={24} />
          </div>
          <h1 className="text-2xl font-bold">Kreiraj nalog</h1>
          <p className="text-blue-100 text-sm">Pridruži nam se danas</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ime i prezime</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Marko Marković"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email adresa</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="marko@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lozinka</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Registruj se'}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Već imaš nalog?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Prijavi se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;