"use client"

import { useState, useEffect } from 'react';
import Aside from '../components/Aside';
import Profile from '../components/Profile';
import MenuIcon from '../assets/MenuIcon';
import PowerIcon from '../assets/PowerIcon'; // Asegúrate de tener el icono en esta ruta
import axios from 'axios';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const showProfile = searchParams.get('profile') === '1';
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/auth/profile', { withCredentials: true });
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const getInitials = (fullName) => {
    if (!fullName) return '';
    const names = fullName.split(' ');
    const firstName = names[0] || '';
    const lastName = names[1] || '';
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Aside isOpen={isSidebarOpen} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-0'}`}>
        <header className="h-20 px-5 bg-primary flex items-center justify-between text-white sticky top-0 z-10">
          <button onClick={toggleSidebar} className="text-white">
            <MenuIcon width={18} />
          </button>
          <div className="flex items-center gap-3">
            {/* Agregando el icono de apagado */}
            <button onClick={handleLogout} className="text-white">
              <PowerIcon width={18} />
            </button>
            {/* Agregando el icono de apagado */}
            <Link href={`${pathname}?profile=1`}>
              <div className="flex items-center gap-3">
                <div className="text-sm">
                  {userData && (
                    <>
                      <p className="capitalize">{`${userData.us_nombres} ${userData.us_apellidos}`}</p>
                      <span className="text-xs text-slate-300 capitalize">{userData.rol_descripcion}</span>
                    </>
                  )}
                </div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-lg font-bold text-primary">
                  {userData ? getInitials(`${userData.us_nombres} ${userData.us_apellidos}`) : ''}
                </div>
              </div>
            </Link>
          </div>
        </header>
        <main className="p-4 main">
          {children}
        </main>
      </div>

      <Profile userData={userData} show={showProfile} />
    </div>
  );
}
