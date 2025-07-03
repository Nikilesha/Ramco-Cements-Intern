
import { useState } from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock, Filter, Search, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Alerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'breakdown',
      title: 'Vehicle Breakdown Alert',
      message: 'Truck RC004 has reported a mechanical breakdown on Delhi Highway, KM 45',
      truck: 'RC004',
      driver: 'Prakash Rao',
      timestamp: '2024-06-30 14:30:00',
      status: 'active',
      priority: 'high',
      location: 'Delhi Highway, KM 45'
    },
    {
      id: 2,
      type: 'delay',
      title: 'Delivery Delay Warning',
      message: 'Truck RC002 is running 45 minutes behind schedule due to traffic congestion',
      truck: 'RC002',
      driver: 'Suresh Reddy',
      timestamp: '2024-06-30 13:15:00',
      status: 'active',
      priority: 'medium',
      location: 'Mumbai-Pune Highway'
    },
    {
      id: 3,
      type: 'unauthorized_stop',
      title: 'Unauthorized Stop Detected',
      message: 'Truck RC001 has been stationary for 30+ minutes at an unscheduled location',
      truck: 'RC001',
      driver: 'Rajesh Kumar',
      timestamp: '2024-06-30 12:45:00',
      status: 'resolved',
      priority: 'low',
      location: 'Hosur Road'
    },
    {
      id: 4,
      type: 'maintenance',
      title: 'Maintenance Due Alert',
      message: 'Truck RC005 is due for scheduled maintenance within 48 hours',
      truck: 'RC005',
      driver: 'Amit Sharma',
      timestamp: '2024-06-30 11:20:00',
      status: 'active',
      priority: 'medium',
      location: 'Chennai Depot'
    },
    {
      id: 5,
      type: 'geofence',
      title: 'Route Deviation Alert',
      message: 'Truck RC003 has deviated from assigned route by more than 5 KM',
      truck: 'RC003',
      driver: 'Vijay Singh',
      timestamp: '2024-06-30 10:10:00',
      status: 'acknowledged',
      priority: 'high',
      location: 'NH-44 Bypass'
    }
  ]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'breakdown':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'delay':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'maintenance':
        return <Bell className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Priority</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low Priority</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-red-100 text-red-800">Active</Badge>;
      case 'acknowledged':
        return <Badge className="bg-yellow-100 text-yellow-800">Acknowledged</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const markAsRead = (alertId: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: alert.status === 'active' ? 'acknowledged' : alert.status }
        : alert
    ));
  };

  const resolveAlert = (alertId: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved' }
        : alert
    ));
  };

  const activeAlerts = alerts.filter(alert => alert.status === 'active');
  const acknowledgedAlerts = alerts.filter(alert => alert.status === 'acknowledged');
  const resolvedAlerts = alerts.filter(alert => alert.status === 'resolved');

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alerts & Notifications</h1>
          <p className="text-gray-600">Monitor and manage system alerts and notifications</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-red-100 text-red-800 text-lg px-3 py-1">
            {activeAlerts.length} Active
          </Badge>
          <Button variant="outline">
            <Bell className="w-4 h-4 mr-2" />
            Configure Alerts
          </Button>
        </div>
      </div>

      {/* Alert Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-600">{activeAlerts.length}</p>
                <p className="text-sm text-gray-600">Active Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{acknowledgedAlerts.length}</p>
                <p className="text-sm text-gray-600">Acknowledged</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">{resolvedAlerts.length}</p>
                <p className="text-sm text-gray-600">Resolved Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Bell className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-600">12</p>
                <p className="text-sm text-gray-600">Avg Daily Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search alerts by truck ID, driver, or message..."
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active" className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Active ({activeAlerts.length})</span>
          </TabsTrigger>
          <TabsTrigger value="acknowledged" className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Acknowledged ({acknowledgedAlerts.length})</span>
          </TabsTrigger>
          <TabsTrigger value="resolved" className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Resolved ({resolvedAlerts.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="space-y-4">
            {activeAlerts.map((alert) => (
              <Card key={alert.id} className="border-l-4 border-l-red-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                          {getPriorityBadge(alert.priority)}
                          {getStatusBadge(alert.status)}
                        </div>
                        <p className="text-gray-700 mb-3">{alert.message}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Truck:</span> {alert.truck}
                          </div>
                          <div>
                            <span className="font-medium">Driver:</span> {alert.driver}
                          </div>
                          <div>
                            <span className="font-medium">Location:</span> {alert.location}
                          </div>
                          <div>
                            <span className="font-medium">Time:</span> {new Date(alert.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => markAsRead(alert.id)}
                      >
                        Acknowledge
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => resolveAlert(alert.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Resolve
                      </Button>
                      <Button variant="ghost" size="sm">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="acknowledged">
          <div className="space-y-4">
            {acknowledgedAlerts.map((alert) => (
              <Card key={alert.id} className="border-l-4 border-l-yellow-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                          {getPriorityBadge(alert.priority)}
                          {getStatusBadge(alert.status)}
                        </div>
                        <p className="text-gray-700 mb-3">{alert.message}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Truck:</span> {alert.truck}
                          </div>
                          <div>
                            <span className="font-medium">Driver:</span> {alert.driver}
                          </div>
                          <div>
                            <span className="font-medium">Location:</span> {alert.location}
                          </div>
                          <div>
                            <span className="font-medium">Time:</span> {new Date(alert.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => resolveAlert(alert.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Resolve
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resolved">
          <div className="space-y-4">
            {resolvedAlerts.map((alert) => (
              <Card key={alert.id} className="border-l-4 border-l-green-500 opacity-75">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                        {getPriorityBadge(alert.priority)}
                        {getStatusBadge(alert.status)}
                      </div>
                      <p className="text-gray-700 mb-3">{alert.message}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Truck:</span> {alert.truck}
                        </div>
                        <div>
                          <span className="font-medium">Driver:</span> {alert.driver}
                        </div>
                        <div>
                          <span className="font-medium">Location:</span> {alert.location}
                        </div>
                        <div>
                          <span className="font-medium">Time:</span> {new Date(alert.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Alerts;
