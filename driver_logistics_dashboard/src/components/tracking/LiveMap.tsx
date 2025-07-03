import { useState } from 'react';
import { MapPin, Truck } from 'lucide-react';

const LiveMap = () => {
  const [selectedTruck, setSelectedTruck] = useState<string | null>(null);

  // Mock truck data
  const trucks = [
    { id: 'RC001', driver: 'Rajesh Kumar', status: 'In Transit', location: 'Chennai - Bangalore', progress: 65 },
    { id: 'RC002', driver: 'Suresh Reddy', status: 'Loading', location: 'Hyderabad Depot', progress: 10 },
    { id: 'RC003', driver: 'Vijay Singh', status: 'Delivered', location: 'Mumbai Hub', progress: 100 },
    { id: 'RC004', driver: 'Prakash Rao', status: 'In Transit', location: 'Pune - Delhi', progress: 40 },
  ];

  return (
    <div className="h-96">
      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-full overflow-hidden">
        
        {/* Map Header */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <div className="bg-white rounded-lg px-3 py-2 shadow-md">
            <span className="text-sm font-medium text-gray-700">Live Tracking - {trucks.length} Active Trucks</span>
          </div>
          <div className="bg-white rounded-lg px-3 py-2 shadow-md">
            <span className="text-sm text-gray-600">Last Updated: Now</span>
          </div>
        </div>

        {/* Simple Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 800 600">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3B82F6" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Truck Markers */}
        <div className="absolute top-32 left-20 z-20">
          <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg animate-pulse cursor-pointer hover:scale-110 transition-transform">
            <Truck className="w-4 h-4" />
          </div>
          <div className="mt-1 bg-white rounded px-2 py-1 text-xs shadow">RC001</div>
        </div>

        <div className="absolute top-48 right-24 z-20">
          <div className="bg-green-600 text-white p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="mt-1 bg-white rounded px-2 py-1 text-xs shadow">RC003</div>
        </div>

        <div className="absolute bottom-28 left-1/3 z-20">
          <div className="bg-orange-600 text-white p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
            <Truck className="w-4 h-4" />
          </div>
          <div className="mt-1 bg-white rounded px-2 py-1 text-xs shadow">RC004</div>
        </div>

        <div className="absolute top-40 left-1/2 z-20">
          <div className="bg-purple-600 text-white p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
            <Truck className="w-4 h-4" />
          </div>
          <div className="mt-1 bg-white rounded px-2 py-1 text-xs shadow">RC002</div>
        </div>

        {/* Simple Route Lines */}
        <svg className="absolute inset-0 w-full h-full z-10">
          <path
            d="M60 80 Q 200 100 300 160"
            stroke="#3B82F6"
            strokeWidth="3"
            fill="none"
            strokeDasharray="5,5"
            className="animate-pulse"
          />
          <path
            d="M300 200 Q 400 180 500 240"
            stroke="#10B981"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M200 400 Q 350 350 500 380"
            stroke="#F59E0B"
            strokeWidth="3"
            fill="none"
            strokeDasharray="5,5"
          />
          <path
            d="M400 300 Q 500 280 600 320"
            stroke="#8B5CF6"
            strokeWidth="3"
            fill="none"
          />
        </svg>

        {/* Status Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg z-10">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Truck Status</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-xs">In Transit</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <span className="text-xs">Loading</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span className="text-xs">Delivered</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
              <span className="text-xs">In Transit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;
