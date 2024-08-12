'use client';

import Link from "next/link";
import HomeIcon from '../assets/HomeIcon';
import UserIcon from '../assets/UserIcon';
import SignOutIcon from '../assets/SignOutIcon';
import ReportsIcon from '../assets/ReportsIcon';
import './aside.css';
import { useState } from 'react';

export default function Aside({ isOpen }) {
  const [showSubmenu, setshowSubmenu] = useState(false);

  return (
    <aside className={`fixed top-0 left-0 h-screen bg-primary text-white transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-72 overflow-y-auto aside`}>
      <div className="h-20 flex items-center justify-center">
        <img src="/img/Logo_Blanco.png" alt="logo blanco" className="block object-cover max-w-[150px]" />
      </div>
      <div className="aside__nav grid gap-2 grid-rows-[1fr_auto]">
        <div className="px-3 py-6 gap-1">
          <div className="grid gap-1">
            <Link href="/main/dashboard" className="flex px-3 rounded-md items-center gap-2 py-3 transition duration-300 hover:bg-white hover:text-primary group/link">
              <HomeIcon width={18} className='fill-white group-hover/link:fill-primary inline-block' /> Panel De Control
            </Link>
            
            <Link href="/main/usuarios" className="flex px-3 rounded-md items-center gap-2 py-3 transition duration-300 hover:bg-white hover:text-primary group/link">
              <UserIcon width={18} className='fill-white group-hover/link:fill-primary inline-block' /> Usuarios
            </Link>

            <Link href="/main/usuarios" className="flex px-3 rounded-md items-center gap-2 py-3 transition duration-300 hover:bg-white hover:text-primary group/link">
              <ReportsIcon width={18} className='fill-white group-hover/link:fill-primary inline-block' /> Reportes
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
