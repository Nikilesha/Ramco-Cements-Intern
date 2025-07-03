
import { Clock, MapPin, Truck } from 'lucide-react';

const RecentShipments = () => {
  const shipments = [
    {
      id: 'SH001',
      truck: 'RC001',
      route: 'Chennai → Bangalore',
      status: 'In Transit',
      eta: '2h 30m',
      progress: 65
    },
    {
      id: 'SH002',
      truck: 'RC003',
      route: 'Mumbai → Pune',
      status: 'Delivered',
      eta: 'Completed',
      progress: 100
    },
    {
      id: 'SH003',
      truck: 'RC002',
      route: 'Hyderabad → Chennai',
      status: 'Loading',
      eta: '45m',
      progress: 10
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Loading':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Shipments</h2>
      
      <div className="space-y-4">
        {shipments.map((shipment) => (
          <div key={shipment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-gray-600" />
                <span className="font-medium text-gray-900">{shipment.truck}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                {shipment.status}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 mb-3">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{shipment.route}</span>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">ETA: {shipment.eta}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{shipment.progress}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${shipment.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-800 text-sm font-medium py-2">
        View All Shipments
      </button>
    </div>
  );
};

export default RecentShipments;
