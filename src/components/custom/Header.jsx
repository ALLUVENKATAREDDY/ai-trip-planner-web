import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../service/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Import icons for mobile menu

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  // Handle Signup/Login
  const handleAuth = async (e) => {
  e.preventDefault();
  setError("");

  if (!email || !password || password.length < 6) {
    setError("Enter a valid email and password (at least 6 characters).");
    return;
  }

  try {
    if (isSignUp) {
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }

    setShowAuthDialog(false);
    // Clear the form fields after submission
    setEmail("");
    setPassword("");
  } catch (err) {
    setError(err.message);
  }
};

  // Logout User
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-16 bg-gray-800 text-white p-4 flex justify-between items-center shadow-md z-50">

        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300">My App</Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
        </nav>

        {/* Authentication Buttons */}
        <div className="hidden md:flex space-x-4">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700">
              Logout
            </button>
          ) : (
            <>
              <button onClick={() => { setIsSignUp(true); setShowAuthDialog(true); }} className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
                Sign Up
              </button>
              <button onClick={() => { setIsSignUp(false); setShowAuthDialog(true); }} className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700">
                Login
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-gray-800 text-white p-6 flex flex-col space-y-4 md:hidden">
          <Link to="/" className="hover:text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/contact" className="hover:text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>

          {isAuthenticated ? (
            <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700">
              Logout
            </button>
          ) : (
            <>
              <button onClick={() => { setIsSignUp(true); setShowAuthDialog(true); setIsMobileMenuOpen(false); }} className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
                Sign Up
              </button>
              <button onClick={() => { setIsSignUp(false); setShowAuthDialog(true); setIsMobileMenuOpen(false); }} className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700">
                Login
              </button>
            </>
          )}
        </div>
      )}

      {/* Authentication Dialog */}
      {showAuthDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{isSignUp ? "Sign Up" : "Login"}</h2>

            <form onSubmit={handleAuth}>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border rounded p-2 w-full bg-white"
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border rounded p-2 w-full bg-white"
                />
              </div>

              {error && <p className="text-red-500">{error}</p>}

              <div className="flex justify-between mt-4">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  {isSignUp ? "Sign Up" : "Login"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAuthDialog(false)}
                  className="bg-gray-400 px-4 py-2 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
