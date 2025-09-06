"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Home, Folder, User, Mail } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home", icon: <Home size={24} /> },
  { label: "Projects", href: "#projects", icon: <Folder size={24} /> },
  { label: "About", href: "#about", icon: <User size={24} /> },
  { label: "Contact", href: "#contact", icon: <Mail size={24} /> },
];

export default function FloatingSidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP animation
  useEffect(() => {
    if (sidebarRef.current && !isMobile) {
      gsap.fromTo(
        sidebarRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        }
      );
    }
  }, [isMobile]);

  if (isMobile) {
    // 👉 Bottom Navigation (mobile)
    return (
      <nav className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[9999] flex items-center justify-around w-[90%] max-w-md bg-white/40 backdrop-blur-lg border border-gray-300 shadow-2xl rounded-full px-6 py-2">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex flex-col items-center text-gray-800 hover:text-blue-600 transition-all duration-200"
          >
            {item.icon}
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </a>
        ))}
      </nav>
    );
  }

  // 👉 Floating Sidebar (desktop)
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-auto">
        <aside
          ref={sidebarRef}
          className="flex flex-col items-center gap-6 w-20 px-4 py-6 
            bg-white/40 backdrop-blur-lg border border-gray-300 shadow-2xl
            rounded-2xl transition-all hidden md:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex flex-col items-center text-gray-800 hover:text-blue-600 transition-all duration-200"
            >
              <div>{item.icon}</div>
              <span className="text-[11px] mt-1 font-medium">{item.label}</span>
            </a>
          ))}
        </aside>
      </div>
    </div>
  );
}
