
import { useState } from 'react';
import { Settings as SettingsIcon, Users, MapPin, Bell, Database, Shield, Palette } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const Settings = () => {
  const [users] = useState([
    { id: 1, name: 'Admin User', email: 'admin@ramcocements.com', role: 'admin', status: 'active' },
    { id: 2, name: 'Fleet Manager', email: 'manager@ramcocements.com', role: 'manager', status: 'active' },
    { id: 3, name: 'Supervisor', email: 'supervisor@ramcocements.com', role: 'manager', status: 'active' },
    { id: 4, name: 'Driver Portal', email: 'driver@ramcocements.com', role: 'driver', status: 'active' }
  ]);

  const [regions] = useState([
    { id: 1, name: 'North Zone', zones: ['Delhi', 'Punjab', 'Haryana', 'UP'] },
    { id: 2, name: 'South Zone', zones: ['Tamil Nadu', 'Karnataka', 'Andhra Pradesh', 'Kerala'] },
    { id: 3, name: 'West Zone', zones: ['Maharashtra', 'Gujarat', 'Rajasthan', 'MP'] },
    { id: 4, name: 'East Zone', zones: ['West Bengal', 'Odisha', 'Jharkhand', 'Bihar'] }
  ]);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-red-100 text-red-800">Admin</Badge>;
      case 'manager':
        return <Badge className="bg-blue-100 text-blue-800">Manager</Badge>;
      case 'driver':
        return <Badge className="bg-green-100 text-green-800">Driver</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage system configuration and user permissions</p>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="regions" className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>Regions</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <Database className="w-4 h-4" />
            <span>System</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center space-x-2">
            <Palette className="w-4 h-4" />
            <span>Theme</span>
          </TabsTrigger>
        </TabsList>

        {/* User Management */}
        <TabsContent value="users">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>User Management</span>
                  <Button>Add New User</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getRoleBadge(user.role)}
                        <Switch checked={user.status === 'active'} />
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Region Management */}
        <TabsContent value="regions">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Regional Configuration</span>
                  <Button>Add New Region</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {regions.map((region) => (
                    <Card key={region.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{region.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">Zones:</p>
                          <div className="flex flex-wrap gap-2">
                            {region.zones.map((zone, index) => (
                              <Badge key={index} variant="outline">{zone}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Add Zone</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Alert Configuration */}
        <TabsContent value="alerts">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert Thresholds</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="delay-threshold">Delay Alert Threshold (minutes)</Label>
                      <Input id="delay-threshold" type="number" defaultValue="30" />
                    </div>
                    <div>
                      <Label htmlFor="idle-threshold">Idle Time Alert (minutes)</Label>
                      <Input id="idle-threshold" type="number" defaultValue="60" />
                    </div>
                    <div>
                      <Label htmlFor="speed-threshold">Speed Limit Alert (km/h)</Label>
                      <Input id="speed-threshold" type="number" defaultValue="80" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Email Notifications</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>SMS Notifications</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Push Notifications</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Real-time Alerts</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Configuration */}
        <TabsContent value="system">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="tracking-interval">GPS Tracking Interval (seconds)</Label>
                      <Input id="tracking-interval" type="number" defaultValue="30" />
                    </div>
                    <div>
                      <Label htmlFor="map-refresh">Map Refresh Rate (seconds)</Label>
                      <Input id="map-refresh" type="number" defaultValue="15" />
                    </div>
                    <div>
                      <Label htmlFor="data-retention">Data Retention Period (days)</Label>
                      <Input id="data-retention" type="number" defaultValue="365" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Auto Backup</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Real-time Sync</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Debug Mode</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Maintenance Mode</Label>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <Input id="session-timeout" type="number" defaultValue="480" />
                    </div>
                    <div>
                      <Label htmlFor="password-policy">Min Password Length</Label>
                      <Input id="password-policy" type="number" defaultValue="8" />
                    </div>
                    <div>
                      <Label htmlFor="login-attempts">Max Login Attempts</Label>
                      <Input id="login-attempts" type="number" defaultValue="5" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Two-Factor Authentication</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Password Expiry (90 days)</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Login Audit Logs</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>IP Whitelist</Label>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance & Theme</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Dark Mode</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Compact Layout</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>High Contrast</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Animations</Label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
