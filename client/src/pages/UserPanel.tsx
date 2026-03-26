import React from 'react';
import { CheckCircle } from 'lucide-react';

import type { User } from '@/types/Users';

interface DashboardProps {
  user: User;
}

const UserPanel: React.FC<DashboardProps> = ({ user}) => {
    return (
       
         <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
           <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center space-y-6">
             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
               <CheckCircle className="w-8 h-8 text-green-600" />
             </div>
           <div>This is User Panel</div>
    {user?.name}
             {/* <button
               onClick={onLogout}
               className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-lg transition-colors"
             >
               <LogOut size={18} /> Odjavi se
             </button> */}
           </div>

         </div>
       );
       
    
};

export default UserPanel;