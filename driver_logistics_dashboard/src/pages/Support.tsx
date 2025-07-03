
import { useState } from 'react';
import { HelpCircle, MessageCircle, Phone, Mail, FileText, Plus, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Support = () => {
  const [tickets] = useState([
    {
      id: 'TK001',
      title: 'GPS tracking not updating for RC004',
      description: 'Truck location has not been updated for the past 2 hours',
      status: 'open',
      priority: 'high',
      category: 'technical',
      created: '2024-06-30 10:30:00',
      assignedTo: 'IT Support Team'
    },
    {
      id: 'TK002',
      title: 'Unable to generate monthly report',
      description: 'Getting error message when trying to export monthly performance report',
      status: 'in-progress',
      priority: 'medium',
      category: 'software',
      created: '2024-06-29 14:15:00',
      assignedTo: 'Development Team'
    },
    {
      id: 'TK003',
      title: 'Driver mobile app login issues',
      description: 'Multiple drivers reporting login failures on mobile app',
      status: 'resolved',
      priority: 'high',
      category: 'mobile',
      created: '2024-06-28 09:45:00',
      assignedTo: 'Mobile Team'
    }
  ]);

  const faqItems = [
    {
      question: 'How do I reset a driver\'s password?',
      answer: 'Go to Driver Management > Select the driver > Click "Reset Password" > The driver will receive an email with reset instructions.'
    },
    {
      question: 'Why is GPS tracking showing incorrect location?',
      answer: 'Check if the GPS device has clear sky visibility. Restart the device if needed. If the issue persists, create a support ticket.'
    },
    {
      question: 'How to add a new truck to the system?',
      answer: 'Navigate to Fleet Management > Click "Add New Truck" > Fill in all required details including registration, capacity, and assign a driver.'
    },
    {
      question: 'Can I export reports in different formats?',
      answer: 'Yes, reports can be exported in PDF, CSV, and Excel formats. Use the export button in the Reports section.'
    },
    {
      question: 'How to set up custom alert thresholds?',
      answer: 'Go to Settings > Alerts > Configure thresholds for delays, idle time, and speed limits according to your requirements.'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-red-100 text-red-800">Open</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge>Normal</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">IT Support & Helpdesk</h1>
          <p className="text-gray-600">Get help with technical issues and system support</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Ticket</span>
        </Button>
      </div>

      {/* Support Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Open Tickets</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
                <p className="text-sm text-gray-600">Avg Response Time (hrs)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">89%</p>
                <p className="text-sm text-gray-600">Resolution Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">24/7</p>
                <p className="text-sm text-gray-600">Support Available</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        {/* Support Tickets */}
        <TabsContent value="tickets">
          <div className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-6">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search tickets by ID, title, or description..."
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

            {/* Tickets List */}
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <Card key={ticket.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-semibold text-lg">#{ticket.id}</span>
                          <h3 className="font-semibold text-gray-900">{ticket.title}</h3>
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                        </div>
                        <p className="text-gray-700 mb-3">{ticket.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Category:</span> {ticket.category}
                          </div>
                          <div>
                            <span className="font-medium">Assigned to:</span> {ticket.assignedTo}
                          </div>
                          <div>
                            <span className="font-medium">Created:</span> {new Date(ticket.created).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Update</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* FAQ */}
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Support */}
        <TabsContent value="contact">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Support Ticket</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="ticket-title">Subject</Label>
                  <Input id="ticket-title" placeholder="Brief description of the issue" />
                </div>
                <div>
                  <Label htmlFor="ticket-category">Category</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Technical Issue</option>
                    <option>Software Bug</option>
                    <option>Mobile App</option>
                    <option>Hardware Problem</option>
                    <option>Feature Request</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="ticket-priority">Priority</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="ticket-description">Description</Label>
                  <Textarea 
                    id="ticket-description" 
                    placeholder="Detailed description of the issue, including steps to reproduce..."
                    rows={6}
                  />
                </div>
                <Button className="w-full">Submit Ticket</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">24/7 Support Hotline</p>
                      <p className="text-gray-600">+91 1800-XXX-XXXX</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-gray-600">support@ramcocements.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className="text-gray-600">Available 9 AM - 6 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-3">Response Times</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Critical Issues:</span>
                      <span className="font-medium">Within 1 hour</span>
                    </div>
                    <div className="flex justify-between">
                      <span>High Priority:</span>
                      <span className="font-medium">Within 4 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Medium Priority:</span>
                      <span className="font-medium">Within 24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Low Priority:</span>
                      <span className="font-medium">Within 48 hours</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Resources */}
        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Documentation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    User Manual
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Quick Start Guide
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    API Documentation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Troubleshooting Guide
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5" />
                  <span>Training Resources</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Video Tutorials
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Webinar Recordings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Best Practices Guide
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Feature Updates
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Version:</span>
                    <span className="font-medium">v2.4.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Update:</span>
                    <span className="font-medium">June 25, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Server Status:</span>
                    <Badge className="bg-green-100 text-green-800">Online</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Uptime:</span>
                    <span className="font-medium">99.8%</span>
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

export default Support;
