import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // for hamburger icons

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/help", label: "Help" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/logo.svg" alt="logo" className="h-8" />
          <span className="font-semibold text-primary text-lg">CleanGanga</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative font-medium transition ${
                  isActive ? "text-primary" : "text-gray-700 hover:text-primary"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 h-0.5 bg-primary rounded"
                      style={{ bottom: -4 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* Auth Buttons */}
          {!user ? (
            <>
              <NavLink
                to="/auth/login"
                className="px-4 py-2 bg-primary  rounded-md shadow hover:bg-primary/90 transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/auth/register"
                className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition"
              >
                Register
              </NavLink>
            </>
          ) : (
            <div className="flex items-center gap-3 relative">
              <NavLink
                to={`/${user.role}/dashboard`}
                className="text-gray-700 hover:text-primary transition"
              >
                Dashboard
              </NavLink>

              {/* Avatar with hover scale */}
              <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
                <img
                  src="/assets/avatar.png"
                  alt="avatar"
                  className="w-9 h-9 rounded-full border"
                />
              </motion.div>

              {/* Dropdown */}
              <div className="relative group">
                <button className="px-3 py-1 border rounded-md bg-gray-50 hover:bg-gray-100 transition">
                  {user.name}
                </button>
                <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md overflow-hidden opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transform transition duration-200">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-50"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden bg-white shadow-inner overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `py-2 px-3 rounded-md ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {!user ? (
                <>
                  <NavLink
                    to="/auth/login"
                    onClick={() => setMobileOpen(false)}
                    className="py-2 px-3 bg-primary text-white rounded-md text-center"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/auth/register"
                    onClick={() => setMobileOpen(false)}
                    className="py-2 px-3 border border-primary text-primary rounded-md text-center"
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to={`/${user.role}/dashboard`}
                    onClick={() => setMobileOpen(false)}
                    className="py-2 px-3 hover:bg-gray-100 rounded-md"
                  >
                    Dashboard
                  </NavLink>
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="py-2 px-3 hover:bg-gray-100 rounded-md"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="text-left py-2 px-3 hover:bg-gray-100 rounded-md"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
