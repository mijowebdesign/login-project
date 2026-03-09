import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import RegistrationForm from './pages/auth/RegistrationForm';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';  
import MainNavbar from './components/app/MainNavbar';


 export interface UserState {
    name: string;
    email: string;
    token?: string;
  
}

const AppLayout = ({ children, user, setUser, onLogout }: { children: React.ReactNode, user: UserState | null, setUser: (user: UserState | null) => void, onLogout: () => void }) => {
  return <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
    <MainNavbar user={user} setUser={setUser}  onLogout={onLogout}  />
    <main className="flex-1 overflow-y-auto " >
    {children}
    </main>
    </div>
};


const ProtectedRoute = ({ children, user, setUser , onLogout}: { children: React.ReactNode, user: UserState | null , setUser: (user: UserState | null) => void, onLogout: () => void }) => {
  if(!user) {
  return <Navigate to="/" />;
}
return <AppLayout user={user} setUser={setUser} onLogout={onLogout}>{children}</AppLayout>
};


const AppRouter: React.FC = () => {
  const [user, setUser] = useState<UserState | null>(null);
 
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);


  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Routes>
    
      <Route
        path="/admin-panel"
        element={
          <ProtectedRoute user={user} setUser={setUser} onLogout={handleLogout}>
           <AdminPanel user={user!} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
        <Route path="/register" element={user ? <Navigate to="/" /> : <RegistrationForm />} />
      <Route path="/" element={<AppLayout user={user} setUser={setUser} onLogout={handleLogout} ><Dashboard  /></AppLayout>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;