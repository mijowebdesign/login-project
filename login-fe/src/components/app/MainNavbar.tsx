import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import NavbarItems from "./NavbarItems";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserState} from "@/AppRouter";
import logo from "@/assets/images.png"; // Importuj logo
import LoginDialog from "./LoginDialog";
import { useState } from "react";



interface MainNavbarProps {
  user: UserState | null;
  setUser: (user: UserState | null) => void; // Dodajemo setUser funkciju kao prop
  onLogout?: () => void; // Dodajemo logout funkciju kao prop
}

const MainNavbar = ({ user, setUser, onLogout }: MainNavbarProps) => {

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur h-16">
      <div className="container mx-auto h-full flex items-center justify-between px-4">

       <div className="container mx-auto h-full flex items-center justify-start px-4">
        {/* LOGO SA SLIKOM */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={logo}
            alt="Logo" 
            className="h-8 w-auto object-contain" 
          />
          <span className="font-bold text-xl hidden sm:inline-block">
           Moja Basta
          </span>
        </Link>

        <NavbarItems />
        </div>

        {/* DESNA STRANA: AVATAR / DROPDOWN */}
        <div className="flex items-center gap-4">

          
      <LoginDialog 
        open={isLoginOpen} 
        onOpenChange={setIsLoginOpen} 
        setUser={setUser} 
      />
          
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Avatar className="h-9 w-9 border hover:opacity-80 transition">
                  {/* Ako user ima sliku u bazi, stavi je ovde */}
                  <AvatarImage src={user?.name || "https://github.com/shadcn.png"} alt={user?.name} />
                  {/* Fallback su inicijali ako slika ne postoji */}
                  <AvatarFallback className="bg-gray-750 text-white">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-56">
                { user ? <>
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user.name}</span>
                    <span className="text-xs font-normal text-gray-500">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                {user?.name && <DropdownMenuSeparator />}
                <DropdownMenuItem asChild>
                  <Link title="Admin" to="/admin-panel">Admin Panel</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link title="Podešavanja" to="/settings">Podešavanja</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={onLogout}
                  className="text-red-600 focus:text-red-600 cursor-pointer"
                >
                  Odjavi se
                </DropdownMenuItem> </> : (
            <DropdownMenuItem  className=" items-center justify-center"
              onSelect={() => {
                setIsLoginOpen(true);
              }}
            >
              Prijavi se
            </DropdownMenuItem>
          )} 

              </DropdownMenuContent> 
            </DropdownMenu>
          
          
        </div>
      </div>
    </header>
  );
};

export default MainNavbar;