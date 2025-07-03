import KPICards from '../components/dashboard/KPICards';
import LiveMap from '../components/tracking/LiveMap';
import RecentShipments from '../components/dashboard/RecentShipments';
import PerformanceChart from '../components/analytics/PerformanceChart';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Logistics Dashboard</h1>
        <p className="text-gray-600">Real-time overview of your logistics operations</p>
      </div>

      <KPICards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Live Truck Tracking</h2>
            <LiveMap />
          </div>
        </div>
        
        <div className="space-y-6">
          <RecentShipments />
          <PerformanceChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
