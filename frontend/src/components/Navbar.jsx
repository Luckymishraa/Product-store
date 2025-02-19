import { useState, useEffect } from 'react';
import { FaMoon, FaSun, FaPlusSquare } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    // Apply the theme dynamically to the root element
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Save the theme to localStorage
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <nav className="flex items-center justify-between  bg-yellow-700 text-white p-4 dark:bg-gray-900 dark:text-white">
    <Link  to={"/"}>
      <div className="flex items-center space-x-2">

        <img src="" alt="Logo" />
        <h1 className="text-2xl font-bold">ProductCreate</h1>
   
      </div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex">
        <Link to="/create">
          <button>
            <FaPlusSquare size={25} />
          </button>
        </Link>
        <button onClick={toggleTheme}>
          {theme === 'light' ? <FaMoon size={25} /> : <FaSun size={24} />}
        </button>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden" onClick={toggleMenu}>
        {isMenuOpen ? <RxCross2 size={25} /> : <GiHamburgerMenu size={25} />}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 gap-2 left-0 w-full bg-yellow-600 p-4">
          <Link to="/create">
            <button>
              <FaPlusSquare size={25} />
            </button>
          </Link>
          <button onClick={toggleTheme}>
            {theme === 'light' ? <FaMoon size={25} /> : <FaSun size={24} />}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;