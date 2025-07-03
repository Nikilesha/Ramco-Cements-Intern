
import { TrendingUp, TrendingDown, Truck, MapPin, Clock, AlertTriangle } from 'lucide-react';

const KPICards = () => {
  const kpis = [
    {
      title: 'Active Trucks',
      value: '127',
      change: '+5.2%',
      trend: 'up',
      icon: Truck,
      color: 'blue'
    },
    {
      title: 'On-Time Delivery',
      value: '94.8%',
      change: '+2.1%',
      trend: 'up',
      icon: Clock,
      color: 'green'
    },
    {
      title: 'Total Routes',
      value: '43',
      change: '+8 today',
      trend: 'up',
      icon: MapPin,
      color: 'purple'
    },
    {
      title: 'Critical Alerts',
      value: '3',
      change: '-2 from yesterday',
      trend: 'down',
      icon: AlertTriangle,
      color: 'red'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-600',
      green: 'bg-green-500 text-green-600',
      purple: 'bg-purple-500 text-purple-600',
      red: 'bg-red-500 text-red-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-full ${getColorClasses(kpi.color)} bg-opacity-10`}>
              <kpi.icon className={`w-6 h-6 ${getColorClasses(kpi.color).split(' ')[1]}`} />
            </div>
            <div className="flex items-center space-x-1">
              {kpi.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${
                kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.change}
              </span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
            <p className="text-gray-600 text-sm">{kpi.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
