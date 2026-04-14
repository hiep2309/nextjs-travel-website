"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe, ChevronDown, LogIn, Menu } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<any>(null);

  const { user, loading, logout } = useAuth();

  useEffect(() => {
    const handleClick = (e: any) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/5">
        
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image
                src="/logo.png"
                alt="VN Insight"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-black text-white text-sm md:text-base">
              VN INSIGHT
            </span>
          </Link>

          {/* MENU */}
          <nav className="hidden lg:flex items-center gap-8">
            {["Home", "Destinations", "Tours", "Guides"].map((item) => (
              <Link
                key={item}
                href="/"
                className="text-sm font-semibold text-gray-300 hover:text-blue-400 transition"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-3 md:gap-5">

            {/* Language */}
            <div className="hidden sm:flex items-center gap-1 cursor-pointer text-gray-400 hover:text-white transition">
              <Globe size={16} />
              <span className="text-xs font-bold">VI</span>
              <ChevronDown size={12} />
            </div>

            {/* AUTH UI */}
            <div className="hidden md:flex items-center gap-4">

              {loading ? (
                <div className="text-gray-400 text-sm">Loading...</div>
              ) : user ? (
                <div className="relative" ref={menuRef}>

                  {/* AVATAR */}
                  <button onClick={() => setOpenMenu(!openMenu)}>
                    <img
                      src={
                        user.photoURL ||
                        `https://ui-avatars.com/api/?name=${user.email}`
                      }
                      className="w-9 h-9 rounded-full border hover:scale-105 transition"
                    />
                  </button>

                  {/* DROPDOWN */}
                  {openMenu && (
                    <div className="absolute right-0 mt-3 w-80 bg-white text-black rounded-2xl shadow-2xl p-3">

                      {/* USER CARD */}
                      <div className="bg-gray-100 rounded-xl p-3 mb-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              user.photoURL ||
                              `https://ui-avatars.com/api/?name=${user.email}`
                            }
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <p className="font-semibold">{user.email}</p>
                            <p className="text-sm text-gray-500">Guest User</p>
                          </div>
                        </div>

                        <Link
                          href="/profile"
                          className="mt-3 block text-center bg-gray-200 hover:bg-gray-300 py-2 rounded-xl text-sm font-medium"
                        >
                          Xem trang cá nhân
                        </Link>
                      </div>

                      {/* MENU */}
                      <div className="space-y-1">

                        <button className="menu-item">
                          ⚙️ Cài đặt & quyền riêng tư
                        </button>

                        <button className="menu-item">
                          ❓ Trợ giúp & hỗ trợ
                        </button>

                        <button className="menu-item">
                          🌙 Dark mode
                        </button>

                        <button
                          onClick={logout}
                          className="menu-item text-red-500"
                        >
                          🚪 Đăng xuất
                        </button>

                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-semibold text-gray-300 hover:text-white flex items-center gap-2"
                  >
                    <LogIn size={16} />
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-bold transition"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* MOBILE */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-white"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="lg:hidden bg-slate-900 border-t border-white/10 px-4 py-4 space-y-4">
            
            {["Home", "Destinations", "Tours", "Guides"].map((item) => (
              <Link
                key={item}
                href="/"
                className="block text-gray-300 font-medium hover:text-blue-400"
              >
                {item}
              </Link>
            ))}

            <div className="border-t border-white/10 pt-4 space-y-3">
              
              {user ? (
                <div className="flex items-center gap-3">
                  <img
                    src={
                      user.photoURL ||
                      `https://ui-avatars.com/api/?name=${user.email}`
                    }
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-white text-sm">{user.email}</span>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block text-gray-300 hover:text-white"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="block bg-blue-600 text-center text-white py-2 rounded-full font-bold"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <div className="h-16" />
    </>
  );
};

export default Navbar;
