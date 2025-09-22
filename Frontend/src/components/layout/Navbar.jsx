import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoimage from '../../images/logo.jpg'

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/help", label: "Help" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logoimage} alt="logo" className="h-30 w-30" />
          {/* <span className="font-bold text-2xl text-primary hover:text-primary/80 transition"> */}
          {/* CleanGanga */}
          {/* </span> */}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative font-medium text-gray-700 hover:text-primary transition`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10 hover:-translate-y-0.5 transition transform">
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 h-1 bg-primary rounded-full"
                      style={{ bottom: -6 }}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* Auth Buttons / User */}
          {!user ? (
            <div className="flex gap-4">
              <NavLink
                to="/auth/login"
                className="px-5 py-2 bg-primary  rounded-lg shadow-lg hover:bg-primary/90 transition transform hover:-translate-y-1"
              >
                Login
              </NavLink>
              <NavLink
                to="/auth/register"
                className="px-5 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition transform hover:-translate-y-1"
              >
                Register
              </NavLink>
            </div>
          ) : (
            <div className="flex items-center gap-4 relative">
              <NavLink
                to={`/${user.role}/dashboard`}
                className="text-gray-700 hover:text-primary font-semibold transition transform hover:scale-105"
              >
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
              </NavLink>

              {/* User Dropdown */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-primary  font-bold text-lg shadow-md hover:shadow-lg hover:bg-primary/90 transition"
                >
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </motion.button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg overflow-hidden z-50"
                    >
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-50 transition"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 transition"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-inner overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `py-2 px-3 rounded-lg ${isActive
                      ? "text-primary bg-primary/10 font-semibold"
                      : "text-gray-700 hover:bg-gray-100 transition"
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
                    className="py-2 px-3 bg-primary  rounded-lg text-center hover:bg-primary/90 transition"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/auth/register"
                    onClick={() => setMobileOpen(false)}
                    className="py-2 px-3 border border-primary text-primary rounded-lg text-center hover:bg-primary/10 transition"
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to={`/${user.role}/dashboard`}
                    onClick={() => setMobileOpen(false)}
                    className="py-2 px-3 hover:bg-gray-100 rounded-lg transition"
                  >
                    Dashboard
                  </NavLink>
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="py-2 px-3 hover:bg-gray-100 rounded-lg transition"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="text-left py-2 px-3 hover:bg-gray-100 rounded-lg transition"
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
