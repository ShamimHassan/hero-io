import React, { useState, useEffect, useMemo } from 'react';
import appsData from '../data/apps.json';
import AppCard from '../components/AppCard';
import { Search, ChevronDown } from 'lucide-react';

const AllApps = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState(''); // '', 'high-low', 'low-high'
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  const filteredAndSortedApps = useMemo(() => {
    let result = appsData.filter(app =>
      app.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === 'high-low') {
      result.sort((a, b) => b.downloads - a.downloads);
    } else if (sortOrder === 'low-high') {
      result.sort((a, b) => a.downloads - b.downloads);
    }

    return result;
  }, [searchTerm, sortOrder]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-left">All Apps</h1>
        <p className="text-gray-600 text-lg text-left">Explore our extensive collection of apps for every category and use case.</p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center space-x-4">
          <p className="text-gray-700 font-medium">Total Apps: <span className="text-blue-600">{filteredAndSortedApps.length}</span></p>
          
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
            >
              <option value="">Sort by Downloads</option>
              <option value="high-low">High-Low</option>
              <option value="low-high">Low-High</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search apps by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Apps Section */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-500 font-medium">Searching for apps...</p>
        </div>
      ) : filteredAndSortedApps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {filteredAndSortedApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <img src="/assets/App-Error.png" alt="No app found" className="w-32 h-32 mx-auto mb-6 grayscale opacity-50" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No App Found</h3>
          <p className="text-gray-500">We couldn't find any app matching your search term.</p>
        </div>
      )}
    </div>
  );
};

export default AllApps;
