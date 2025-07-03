import { useState } from 'react';
import { Truck, Plus, Search, Filter, Edit, Trash2, Fuel, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const FleetManagement = () => {
  const [trucks] = useState([
    {
      id: 'RC001',
      registration: 'TN 01 AB 1234',
      model: 'Tata Prima 2518.K',
      capacity: '25 tons',
      status: 'active',
      driver: 'Rajesh Kumar',
      route: 'Chennai - Bangalore',
      fuelEfficiency: '4.2 km/l',
      lastService: '2024-05-15',
      nextService: '2024-08-15',
      mileage: '1,24,567 km'
    },
    {
      id: 'RC002',
      registration: 'AP 09 CD 5678',
      model: 'Ashok Leyland 2518',
      capacity: '25 tons',
      status: 'maintenance',
      driver: 'Suresh Reddy',
      route: 'Hyderabad - Mumbai',
      fuelEfficiency: '3.8 km/l',
      lastService: '2024-04-20',
      nextService: '2024-07-20',
      mileage: '98,432 km'
    },
    {
      id: 'RC003',
      registration: 'MH 12 EF 9012',
      model: 'Mahindra Blazo X 28',
      capacity: '28 tons',
      status: 'active',
      driver: 'Vijay Singh',
      route: 'Mumbai - Delhi',
      fuelEfficiency: '4.5 km/l',
      lastService: '2024-06-01',
      nextService: '2024-09-01',
      mileage: '87,234 km'
    },
    {
      id: 'RC004',
      registration: 'DL 03 GH 3456',
      model: 'Volvo FM 400',
      capacity: '30 tons',
      status: 'inactive',
      driver: 'Prakash Rao',
      route: 'Delhi - Kolkata',
      fuelEfficiency: '5.1 km/l',
      lastService: '2024-05-28',
      nextService: '2024-08-28',
      mileage: '1,56,789 km'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getServiceStatus = (nextService: string) => {
    const nextDate = new Date(nextService);
    const today = new Date();
    const daysUntil = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (daysUntil < 30) {
      return <Badge className="bg-red-100 text-red-800">Service Due</Badge>;
    } else if (daysUntil < 60) {
      return <Badge className="bg-yellow-100 text-yellow-800">Service Soon</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800">Service OK</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fleet Management</h1>
          <p className="text-gray-600">Manage your truck fleet, maintenance, and assignments</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add New Truck</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Truck className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">127</p>
                <p className="text-sm text-gray-600">Total Trucks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">89</p>
                <p className="text-sm text-gray-600">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Wrench className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">12</p>
                <p className="text-sm text-gray-600">In Maintenance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Fuel className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-600">4.2</p>
                <p className="text-sm text-gray-600">Avg Efficiency (km/l)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by truck ID, registration, or driver..."
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

      {/* Trucks Table */}
      <Card>
        <CardHeader>
          <CardTitle>Fleet Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Truck ID</TableHead>
                <TableHead>Registration</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Fuel Efficiency</TableHead>
                <TableHead>Service Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trucks.map((truck) => (
                <TableRow key={truck.id}>
                  <TableCell className="font-medium">{truck.id}</TableCell>
                  <TableCell>{truck.registration}</TableCell>
                  <TableCell>{truck.model}</TableCell>
                  <TableCell>{truck.capacity}</TableCell>
                  <TableCell>{getStatusBadge(truck.status)}</TableCell>
                  <TableCell>{truck.driver}</TableCell>
                  <TableCell>{truck.route}</TableCell>
                  <TableCell>{truck.fuelEfficiency}</TableCell>
                  <TableCell>{getServiceStatus(truck.nextService)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FleetManagement;
