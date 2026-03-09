import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {  useNavigate } from 'react-router-dom';

import { login } from '@/services/authService';
import type { LoginRequest } from '@/services/authService';
import LoginForm from "@/pages/auth/LoginForm";
import type { UserState } from '@/AppRouter';



const LoginDialog = ({ setUser , open, onOpenChange }: { setUser: (user: UserState | null) => void, open: boolean, onOpenChange: (open: boolean) => void }) => {

      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);

      const navigate = useNavigate();

  const handleLogin = async (formData: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(formData);
      setUser( data?.user || null);
      localStorage.setItem('user', JSON.stringify(data?.user || null));
      onOpenChange(false);
      navigate('/admin-panel');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Greška pri prijavi.');
    } finally {
      setLoading(false);
    }
  };

  return (
   <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader className="sr-only">
            <DialogTitle>Prijavi se</DialogTitle>
            <DialogDescription className="sr-only">
             Ovo je login forma. Ovde ćeš moći da se prijaviš na svoj nalog.
            </DialogDescription>
          </DialogHeader>
    
        {/* Form */}
        <LoginForm onLogin={handleLogin} loading={loading} error={error} />
          
          <DialogFooter>
          </DialogFooter>
        </DialogContent>
  
    </Dialog>
  )
  
}

export default LoginDialog;
