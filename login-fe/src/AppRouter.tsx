import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from './pages/auth/RegistrationForm';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';  
import MainNavbar from './components/app/MainNavbar';
import type { UserState } from './types/Login';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/state/store';
import { setUser } from './state/user/userSlice';



const AppLayout = ({ children }: { children: React.ReactNode}) => {
  return <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
    <MainNavbar  />
    <main className="flex-1 overflow-y-auto " >
    {children}
    </main>
    </div>
};


const ProtectedRoute = ({ children, user }: { children: React.ReactNode, user: UserState | null }) => {
  if(!user) {
  return <Navigate to="/" />;
}
return <AppLayout >{children}</AppLayout>
};


const AppRouter: React.FC = () => {
  

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();


  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) dispatch(setUser(JSON.parse(savedUser)));
  }, []);


  return (
    <Routes>
    
      <Route
        path="/admin-panel"
        element={
          <ProtectedRoute user={user} >
           <AdminPanel user={user} />
          </ProtectedRoute>
        }
      />
        <Route path="/register" element={user ? <Navigate to="/" /> : <RegistrationForm />} />
      <Route path="/" element={<AppLayout ><Dashboard  /></AppLayout>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;