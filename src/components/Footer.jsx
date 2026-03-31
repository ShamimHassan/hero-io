import { Mail } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2">
              <img src="/assets/logo.png" alt="Hero IO Logo" className="h-10" />
              <span className="text-xl font-black tracking-tighter">HERO.IO</span>
            </div>
            <p className="text-gray-400 max-w-sm mb-8">
              Hero.IO is your one-stop destination for the best mobile and web applications. Explore, discover, and install the latest apps today.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                < FaGithub className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-gray-400">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/apps" className="hover:text-white transition-colors">Apps</a></li>
              <li><a href="/installation" className="hover:text-white transition-colors">My Installations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-blue-500" />
                <span>support@hero-io.com</span>
              </li>
              <li>123 App Avenue, Tech City, 10001</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Hero IO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
