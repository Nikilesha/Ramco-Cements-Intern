
import { TrendingUp } from 'lucide-react';

const PerformanceChart = () => {
  const performanceData = [
    { day: 'Mon', onTime: 92, delayed: 8 },
    { day: 'Tue', onTime: 88, delayed: 12 },
    { day: 'Wed', onTime: 95, delayed: 5 },
    { day: 'Thu', onTime: 91, delayed: 9 },
    { day: 'Fri', onTime: 97, delayed: 3 },
    { day: 'Sat', onTime: 89, delayed: 11 },
    { day: 'Sun', onTime: 94, delayed: 6 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Weekly Performance</h2>
        <TrendingUp className="w-5 h-5 text-green-500" />
      </div>
      
      <div className="space-y-4">
        {performanceData.map((data, index) => (
          <div key={index} className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-600 w-8">{data.day}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden">
              <div 
                className="bg-green-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${data.onTime}%` }}
              ></div>
              <div 
                className="bg-red-400 h-full absolute top-0 right-0 rounded-full"
                style={{ width: `${data.delayed}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600 w-8">{data.onTime}%</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">On Time</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <span className="text-gray-600">Delayed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
