import { Link } from 'react-router-dom';
import { Download, Star } from 'lucide-react';

const AppCard = ({ app }) => {
  return (
    <Link
      to={`/app/${app.id}`}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100 group flex flex-col"
    >
      <div className="relative pt-[100%]">
        <img
          src={app.image}
          alt={app.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-semibold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">
          {app.title}
        </h3>
        <p className="text-gray-500 text-sm mb-4">{app.companyName}</p>
        
        <div className="mt-auto flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <Download className="w-4 h-4 mr-1 text-blue-500" />
            <span>{(app.downloads / 1000).toFixed(0)}k+</span>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
            <span>{app.ratingAvg}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AppCard;
