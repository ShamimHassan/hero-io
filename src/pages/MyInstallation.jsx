import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useInstallation } from '../context/InstallationContext';
import { Trash2, Package, Star, Download, ChevronDown } from 'lucide-react';

const MyInstallation = () => {
  const { installedApps, uninstallApp } = useInstallation();
  const [sortOrder, setSortOrder] = useState('default'); // default, low-to-high, high-to-low
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortedApps = useMemo(() => {
    const sorted = [...installedApps];
    if (sortOrder === 'low-to-high') {
      sorted.sort((a, b) => a.size - b.size);
    } else if (sortOrder === 'high-to-low') {
      sorted.sort((a, b) => b.size - a.size);
    }
    return sorted;
  }, [installedApps, sortOrder]);

  return (
    <div className="bg-[#F8F9FF] min-h-screen pb-20">
      {/* Header Section */}
      <section className="pt-16 pb-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] mb-4">Your Installed Apps</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">Explore All Trending Apps on the Market developed by us</p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-xl font-bold text-[#1A1A1A]">{installedApps.length} Apps Found</h2>
          <div className="relative group w-full sm:w-auto">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full sm:w-48 flex items-center justify-between px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 font-medium hover:border-gray-300 transition-all shadow-sm"
            >
              {sortOrder === 'default' ? 'Sort By Size' : sortOrder === 'low-to-high' ? 'Size: Low-High' : 'Size: High-Low'}
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-full sm:w-48 bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden z-10">
                <button 
                  onClick={() => { setSortOrder('default'); setIsDropdownOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${sortOrder === 'default' ? 'text-[#7C3AED] font-bold bg-purple-50/50' : 'text-gray-600'}`}
                >
                  Default
                </button>
                <button 
                  onClick={() => { setSortOrder('low-to-high'); setIsDropdownOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${sortOrder === 'low-to-high' ? 'text-[#7C3AED] font-bold bg-purple-50/50' : 'text-gray-600'}`}
                >
                  Size: Low-High
                </button>
                <button 
                  onClick={() => { setSortOrder('high-to-low'); setIsDropdownOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${sortOrder === 'high-to-low' ? 'text-[#7C3AED] font-bold bg-purple-50/50' : 'text-gray-600'}`}
                >
                  Size: High-Low
                </button>
              </div>
            )}
          </div>
        </div>

        {sortedApps.length > 0 ? (
          <div className="space-y-4">
            {sortedApps.map((app) => (
              <div
                key={app.id}
                className="bg-white p-4 md:p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-6"
              >
                {/* App Image */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100 shadow-sm">
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* App Info */}
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{app.title}</h3>
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-xs font-bold text-gray-400">
                    <div className="flex items-center text-[#00D094]">
                      <Download className="w-3.5 h-3.5 mr-1" />
                      {(app.downloads / 1000).toFixed(0)}M
                    </div>
                    <div className="flex items-center text-[#FF9500]">
                      <Star className="w-3.5 h-3.5 mr-1 fill-current" />
                      {app.ratingAvg}
                    </div>
                    <div className="text-gray-400 uppercase tracking-wider">
                      {app.size} MB
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0 w-full md:w-auto">
                  <button
                    onClick={() => uninstallApp(app.id)}
                    className="w-full md:w-auto px-8 py-2.5 bg-[#00D094] text-white rounded-lg font-bold text-sm hover:bg-[#00B884] transition-all shadow-sm hover:shadow-md flex items-center justify-center"
                  >
                    Uninstall
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Installed Apps</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              You haven't installed any applications yet. Explore our store to find the perfect apps for your needs.
            </p>
            <Link
              to="/apps"
              className="inline-flex items-center px-8 py-3 bg-[#7C3AED] text-white rounded-xl font-bold hover:bg-[#6D28D9] transition-all shadow-md hover:shadow-lg"
            >
              Explore Apps
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInstallation;
