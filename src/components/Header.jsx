import { Link, NavLink } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

const Header = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Apps', path: '/apps' },
    { name: 'Installation', path: '/installation' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="Hero IO Logo" className="h-10" />
          <span className="text-xl font-black tracking-tighter text-purple-600">HERO.IO</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-bold transition-all relative py-2 ${
                  isActive 
                    ? 'text-[#7C3AED] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#7C3AED]' 
                    : 'text-gray-500 hover:text-gray-900'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-2.5 bg-[#7C3AED] text-white text-sm font-bold rounded-lg hover:bg-[#6D28D9] transition-all shadow-md hover:shadow-lg"
          >
            <FaGithub className="w-4 h-4 mr-2" />
            Contribute
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
