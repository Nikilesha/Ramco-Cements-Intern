import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Download, Filter, TrendingUp, TrendingDown, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Reports = () => {
  const deliveryData = [
    { region: 'North', success: 95, delayed: 5 },
    { region: 'South', success: 88, delayed: 12 },
    { region: 'East', success: 92, delayed: 8 },
    { region: 'West', success: 90, delayed: 10 },
    { region: 'Central', success: 87, delayed: 13 }
  ];

  const fuelEfficiencyData = [
    { month: 'Jan', efficiency: 4.2 },
    { month: 'Feb', efficiency: 4.1 },
    { month: 'Mar', efficiency: 4.3 },
    { month: 'Apr', efficiency: 4.0 },
    { month: 'May', efficiency: 4.2 },
    { month: 'Jun', efficiency: 4.4 }
  ];

  const routePerformance = [
    { name: 'Chennai-Bangalore', value: 25, color: '#0088FE' },
    { name: 'Mumbai-Delhi', value: 20, color: '#00C49F' },
    { name: 'Hyderabad-Kolkata', value: 18, color: '#FFBB28' },
    { name: 'Delhi-Pune', value: 15, color: '#FF8042' },
    { name: 'Others', value: 22, color: '#8884D8' }
  ];

  const topDrivers = [
    { name: 'Vijay Singh', rating: 4.9, trips: 892, onTime: 96.8 },
    { name: 'Rajesh Kumar', rating: 4.8, trips: 1247, onTime: 94.5 },
    { name: 'Suresh Reddy', rating: 4.6, trips: 1598, onTime: 91.2 },
    { name: 'Prakash Rao', rating: 4.3, trips: 2156, onTime: 88.7 },
    { name: 'Amit Sharma', rating: 4.5, trips: 734, onTime: 93.1 }
  ];

  const monthlyStats = [
    { metric: 'Total Deliveries', value: '2,847', change: '+12%', trend: 'up' },
    { metric: 'On-Time Rate', value: '92.3%', change: '+2.1%', trend: 'up' },
    { metric: 'Fuel Cost', value: '₹4.2L', change: '-5.3%', trend: 'down' },
    { metric: 'Customer Satisfaction', value: '4.6/5', change: '+0.2', trend: 'up' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive performance insights and analytics</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Date Range</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {monthlyStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.metric}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`flex items-center space-x-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delivery Success Rate by Region */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart className="w-5 h-5" />
              <span>Delivery Success Rate by Region</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deliveryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="success" stackId="a" fill="#10B981" name="Success %" />
                <Bar dataKey="delayed" stackId="a" fill="#EF4444" name="Delayed %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fuel Efficiency Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Fuel Efficiency Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={fuelEfficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Performance Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Top Routes Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={routePerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {routePerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Top 5 Drivers Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDrivers.map((driver, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-bold">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{driver.name}</p>
                      <p className="text-sm text-gray-600">{driver.trips} trips completed</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-yellow-100 text-yellow-800">
                        ⭐ {driver.rating}
                      </Badge>
                      <Badge 
                        className={
                          driver.onTime >= 95 
                            ? "bg-green-100 text-green-800"
                            : driver.onTime >= 90
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {driver.onTime}% On-Time
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
