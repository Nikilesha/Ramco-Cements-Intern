
import { useState, useEffect } from 'react';
import { MapPin, Truck, Clock, AlertTriangle, Navigation } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const LiveTracking = () => {
  const [trucks, setTrucks] = useState([
    { 
      id: 'RC001', 
      driver: 'Rajesh Kumar', 
      status: 'on-time', 
      location: { lat: 13.0827, lng: 80.2707 },
      destination: 'Bangalore',
      eta: '2:30 PM',
      speed: 65
    },
    { 
      id: 'RC002', 
      driver: 'Suresh Reddy', 
      status: 'delayed', 
      location: { lat: 17.3850, lng: 78.4867 },
      destination: 'Mumbai',
      eta: '4:45 PM',
      speed: 45
    },
    { 
      id: 'RC003', 
      driver: 'Vijay Singh', 
      status: 'idle', 
      location: { lat: 19.0760, lng: 72.8777 },
      destination: 'Delhi',
      eta: '6:00 PM',
      speed: 0
    },
    { 
      id: 'RC004', 
      driver: 'Prakash Rao', 
      status: 'breakdown', 
      location: { lat: 28.7041, lng: 77.1025 },
      destination: 'Kolkata',
      eta: 'Delayed',
      speed: 0
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'bg-green-500';
      case 'delayed': return 'bg-yellow-500';
      case 'idle': return 'bg-blue-500';
      case 'breakdown': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'on-time': return <Badge className="bg-green-100 text-green-800">On Time</Badge>;
      case 'delayed': return <Badge className="bg-yellow-100 text-yellow-800">Delayed</Badge>;
      case 'idle': return <Badge className="bg-blue-100 text-blue-800">Idle</Badge>;
      case 'breakdown': return <Badge className="bg-red-100 text-red-800">Breakdown</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Live Tracking</h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-700">Live</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-3">
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Navigation className="w-5 h-5" />
                <span>Real-time Fleet Map</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full p-0">
              <div className="relative h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                
                {/* India Map Outline */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600">
                  {/* Routes */}
                  <path d="M150 300 Q 300 250 450 320" stroke="#3B82F6" strokeWidth="3" fill="none" strokeDasharray="5,5" className="animate-pulse" />
                  <path d="M200 400 Q 350 350 500 380" stroke="#10B981" strokeWidth="3" fill="none" />
                  <path d="M300 200 Q 450 150 600 250" stroke="#F59E0B" strokeWidth="3" fill="none" strokeDasharray="5,5" />
                  <path d="M250 450 Q 400 400 550 420" stroke="#EF4444" strokeWidth="3" fill="none" strokeDasharray="8,4" />
                </svg>

                {/* Truck Markers */}
                {trucks.map((truck, index) => (
                  <div
                    key={truck.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${getStatusColor(truck.status)} text-white p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform`}
                    style={{
                      left: `${20 + index * 20}%`,
                      top: `${30 + index * 15}%`
                    }}
                  >
                    <Truck className="w-4 h-4" />
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded px-2 py-1 text-xs text-gray-800 shadow whitespace-nowrap">
                      {truck.id}
                    </div>
                  </div>
                ))}

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg p-4 shadow-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Status Legend</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">On Time</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Delayed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Idle</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Breakdown</span>
                    </div>
                  </div>
                </div>

                {/* Integration Notice */}
                <div className="absolute top-4 right-4 bg-blue-50 border border-blue-200 rounded-lg p-3 max-w-sm">
                  <p className="text-sm text-blue-800">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Live GPS integration ready for Mapbox/Leaflet implementation
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Truck Status Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Trucks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trucks.map((truck) => (
                  <div key={truck.id} className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{truck.id}</span>
                      {getStatusBadge(truck.status)}
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>ETA: {truck.eta}</span>
                      </div>
                      <div>Driver: {truck.driver}</div>
                      <div>Speed: {truck.speed} km/h</div>
                      <div>To: {truck.destination}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span>Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="bg-red-50 border border-red-200 rounded p-2">
                  <div className="text-sm font-medium text-red-800">RC004 - Breakdown</div>
                  <div className="text-xs text-red-600">Location: Delhi Highway</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                  <div className="text-sm font-medium text-yellow-800">RC002 - Delayed</div>
                  <div className="text-xs text-yellow-600">30 mins behind schedule</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;
