import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import appsData from '../data/apps.json';
import { useInstallation } from '../context/InstallationContext';
import { Star, Download, MessageSquare, ArrowLeft, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const AppDetails = () => {
  const { id } = useParams();
  const { installApp, isInstalled } = useInstallation();
  
  const app = useMemo(() => {
    return appsData.find(a => a.id === parseInt(id));
  }, [id]);

  if (!app) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <img src="/assets/App-Error.png" alt="App not found" className="w-48 h-48 mx-auto mb-8 grayscale opacity-50" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">App Not Found</h2>
        <p className="text-gray-600 mb-8">The application you're looking for doesn't exist or has been removed.</p>
        <Link to="/apps" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to All Apps
        </Link>
      </div>
    );
  }

  const alreadyInstalled = isInstalled(app.id);

  const chartData = app.ratings.map(r => ({
    name: r.name,
    count: r.count
  }));

  const COLORS = ['#FEE2E2', '#FEF3C7', '#D1FAE5', '#DBEAFE', '#E0E7FF'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/apps" className="inline-flex items-center text-gray-500 hover:text-gray-900 font-medium mb-12 transition-colors">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to All Apps
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12">
          {/* Left: Image */}
          <div className="col-span-1">
            <div className="aspect-square rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
              <img src={app.image} alt={app.title} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right: Info */}
          <div className="col-span-1 md:col-span-2 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{app.title}</h1>
            <p className="text-xl text-blue-600 font-medium mb-6">{app.companyName}</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 py-6 border-y border-gray-100">
              <div className="text-center">
                <div className="flex items-center justify-center text-gray-900 font-bold text-lg mb-1">
                  <Star className="w-5 h-5 mr-1 text-yellow-400 fill-current" />
                  {app.ratingAvg}
                </div>
                <p className="text-gray-500 text-sm">Rating</p>
              </div>
              <div className="text-center border-l border-gray-100">
                <div className="flex items-center justify-center text-gray-900 font-bold text-lg mb-1">
                  <Download className="w-5 h-5 mr-1 text-blue-500" />
                  {(app.downloads / 1000).toFixed(0)}k+
                </div>
                <p className="text-gray-500 text-sm">Downloads</p>
              </div>
              <div className="text-center border-l border-gray-100">
                <div className="flex items-center justify-center text-gray-900 font-bold text-lg mb-1">
                  <MessageSquare className="w-5 h-5 mr-1 text-green-500" />
                  {app.reviews}
                </div>
                <p className="text-gray-500 text-sm">Reviews</p>
              </div>
              <div className="text-center border-l border-gray-100">
                <div className="flex items-center justify-center text-gray-900 font-bold text-lg mb-1">
                  {app.size}MB
                </div>
                <p className="text-gray-500 text-sm">Size</p>
              </div>
            </div>

            <button
              onClick={() => !alreadyInstalled && installApp(app)}
              disabled={alreadyInstalled}
              className={`w-full sm:w-64 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center ${
                alreadyInstalled
                  ? 'bg-green-50 text-green-600 cursor-not-allowed border-2 border-green-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
              }`}
            >
              {alreadyInstalled ? (
                <>
                  <CheckCircle className="w-6 h-6 mr-2" />
                  Installed
                </>
              ) : (
                'Install Now'
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* App Review Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Review Summary</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 30, top: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={60} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" radius={[0, 10, 10, 0]} barSize={32}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#E2E8F0" strokeWidth={1} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* App Description */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About this app</h2>
          <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
            <p className="mb-4">{app.description}</p>
            <p>
              Discover the latest version of {app.title}, developed by {app.companyName}. This app is designed to provide users with a seamless and intuitive experience, offering powerful features in a lightweight package of just {app.size}MB.
            </p>
            <p className="mt-4 font-medium text-gray-900">Key Features:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Optimized for performance and speed.</li>
              <li>Intuitive user interface for ease of use.</li>
              <li>Regular updates with new features and improvements.</li>
              <li>Secure and privacy-focused design.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDetails;
