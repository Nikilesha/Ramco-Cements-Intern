import { useState } from 'react';
import { User, Plus, Search, Filter, Edit, Trash2, Star, Phone, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const DriverManagement = () => {
  const [drivers] = useState([
    {
      id: 'D001',
      name: 'Rajesh Kumar',
      age: 35,
      license: 'DL1420110012345',
      phone: '+91 98765 43210',
      truck: 'RC001',
      route: 'Chennai - Bangalore',
      rating: 4.8,
      experience: '12 years',
      totalTrips: 1247,
      onTimeDelivery: 94.5,
      status: 'active',
      lastTrip: '2024-06-28'
    },
    {
      id: 'D002',
      name: 'Suresh Reddy',
      age: 42,
      license: 'DL0920110054321',
      phone: '+91 87654 32109',
      truck: 'RC002',
      route: 'Hyderabad - Mumbai',
      rating: 4.6,
      experience: '15 years',
      totalTrips: 1598,
      onTimeDelivery: 91.2,
      status: 'active',
      lastTrip: '2024-06-27'
    },
    {
      id: 'D003',
      name: 'Vijay Singh',
      age: 38,
      license: 'DL1220110098765',
      phone: '+91 76543 21098',
      truck: 'RC003',
      route: 'Mumbai - Delhi',
      rating: 4.9,
      experience: '10 years',
      totalTrips: 892,
      onTimeDelivery: 96.8,
      status: 'active',
      lastTrip: '2024-06-29'
    },
    {
      id: 'D004',
      name: 'Prakash Rao',
      age: 45,
      license: 'DL0320110013579',
      phone: '+91 65432 10987',
      truck: 'RC004',
      route: 'Delhi - Kolkata',
      rating: 4.3,
      experience: '18 years',
      totalTrips: 2156,
      onTimeDelivery: 88.7,
      status: 'on-leave',
      lastTrip: '2024-06-25'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'on-leave':
        return <Badge className="bg-yellow-100 text-yellow-800">On Leave</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getPerformanceBadge = (percentage: number) => {
    if (percentage >= 95) {
      return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    } else if (percentage >= 90) {
      return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
    } else if (percentage >= 85) {
      return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>;
    }
    return <Badge className="bg-red-100 text-red-800">Poor</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Driver Management</h1>
          <p className="text-gray-600">Manage driver profiles, assignments, and performance</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add New Driver</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <User className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">89</p>
                <p className="text-sm text-gray-600">Total Drivers</p>
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
                <p className="text-2xl font-bold text-green-600">67</p>
                <p className="text-sm text-gray-600">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Star className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">4.6</p>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-600">92.3%</p>
                <p className="text-sm text-gray-600">On-Time Rate</p>
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
                  placeholder="Search by name, license, or truck ID..."
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

      {/* Drivers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Driver Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Driver</TableHead>
                <TableHead>License</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Assigned Truck</TableHead>
                <TableHead>Current Route</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{driver.name}</div>
                        <div className="text-sm text-gray-500">Age: {driver.age}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{driver.license}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Phone className="w-3 h-3" />
                      <span className="text-sm">{driver.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>{driver.truck}</TableCell>
                  <TableCell>{driver.route}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {getRatingStars(driver.rating)}
                      <span className="text-sm ml-1">{driver.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{driver.experience}</TableCell>
                  <TableCell>
                    <div>
                      {getPerformanceBadge(driver.onTimeDelivery)}
                      <div className="text-xs text-gray-500 mt-1">
                        {driver.onTimeDelivery}% on-time
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(driver.status)}</TableCell>
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

export default DriverManagement;
