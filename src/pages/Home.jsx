import { Link } from 'react-router-dom';
import appsData from '../data/apps.json';
import AppCard from '../components/AppCard';

const Home = () => {
  const topApps = appsData.slice(0, 8);

  const trustedStats = [
    { label: 'Total Downloads', value: '29.6M', trend: '21% More Than Last Month' },
    { label: 'Total Reviews', value: '906K', trend: '46% More Than Last Month' },
    { label: 'Active Apps', value: '132+', trend: '31 More Will Launch' },
  ];

  return (
    <div className="bg-white">
      {/* Banner */}
      <section className="pt-16 md:pt-4 px-4 overflow-hidden bg-[#F8F9FF]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#1A1A1A] mb-6 leading-tight">
            We Build <br />
            <span className="text-[#7C3AED]">Productive</span> Apps
          </h1>
          <p className="text-sm md:text-base text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            At HERO.IO , we craft innovative apps designed to make everyday life simpler, smarter, and more exciting.
            Our goal is to turn your ideas into digital experiences that truly make an impact.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-white text-gray-900 border border-gray-200 rounded-lg font-bold hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center text-sm"
            >
              <img src="/assets/icon-downloads.png" alt="" className="w-5 h-5 mr-2" />
              Google Play
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-white text-gray-900 border border-gray-200 rounded-lg font-bold hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center text-sm"
            >
              <img src="/assets/icon-downloads.png" alt="" className="w-5 h-5 mr-2" />
              App Store
            </a>
          </div>

          {/* Image under banner content */}
          <div className="relative max-w-lg mx-auto">
            <img 
              src="/assets/hero.png" 
              alt="Hero App Illustration" 
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Trusted By Section (Purple) */}
      <section className="py-20 bg-[#7C3AED] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-16">Trusted By Millions, Built For You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {trustedStats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <p className="text-xs font-medium text-purple-200 uppercase tracking-widest mb-3">{stat.label}</p>
                <p className="text-4xl md:text-6xl font-black mb-4">{stat.value}</p>
                <p className="text-xs text-purple-200 font-medium">{stat.trend}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Apps Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1A1A1A] mb-4">Trending Apps</h2>
          <p className="text-gray-500 mb-16">Explore All Trending Apps on the Market developed by us</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-left">
            {topApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>

          <Link
            to="/apps"
            className="inline-block px-10 py-3 bg-[#7C3AED] text-white rounded-lg font-bold hover:bg-[#6D28D9] transition-all shadow-lg text-sm"
          >
            Show All
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
