import React, { useState } from 'react';
import { Search, Filter, Download, Eye, MapPin, Phone, Calendar, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Mock tourist data
const touristsData = [
  {
    id: "TUR-001",
    blockchainId: "0x1a2b3c4d5e6f",
    name: "Sarah Johnson",
    nationality: "USA",
    phone: "+1-555-0123",
    emergencyContact: "+1-555-0124",
    checkIn: "2024-01-15",
    checkOut: "2024-01-25",
    location: "Marine Drive, Mumbai",
    status: "active",
    riskLevel: "low",
    itinerary: ["Mumbai", "Goa", "Kerala"]
  },
  {
    id: "TUR-002", 
    blockchainId: "0x2b3c4d5e6f7a",
    name: "Mike Chen",
    nationality: "Canada", 
    phone: "+1-604-555-0156",
    emergencyContact: "+1-604-555-0157",
    checkIn: "2024-01-12",
    checkOut: "2024-01-22",
    location: "Old Delhi, Delhi",
    status: "alert",
    riskLevel: "medium",
    itinerary: ["Delhi", "Agra", "Jaipur"]
  },
  {
    id: "TUR-003",
    blockchainId: "0x3c4d5e6f7a8b", 
    name: "Emma Wilson",
    nationality: "UK",
    phone: "+44-20-7946-0958",
    emergencyContact: "+44-20-7946-0959",
    checkIn: "2024-01-10",
    checkOut: "2024-01-20",
    location: "Calangute Beach, Goa",
    status: "safe",
    riskLevel: "low",
    itinerary: ["Goa", "Mumbai", "Pune"]
  },
  {
    id: "TUR-004",
    blockchainId: "0x4d5e6f7a8b9c",
    name: "David Kumar",
    nationality: "Australia",
    phone: "+61-2-9876-5432",
    emergencyContact: "+61-2-9876-5433",
    checkIn: "2024-01-18",
    checkOut: "2024-01-28",
    location: "Taj Mahal, Agra",
    status: "monitoring",
    riskLevel: "high",
    itinerary: ["Delhi", "Agra", "Varanasi"]
  },
  {
    id: "TUR-005",
    blockchainId: "0x5e6f7a8b9c0d",
    name: "Lisa Zhang",
    nationality: "Singapore",
    phone: "+65-6123-4567",
    emergencyContact: "+65-6123-4568",
    checkIn: "2024-01-14",
    checkOut: "2024-01-24",
    location: "Palace Road, Mysore",
    status: "active",
    riskLevel: "low",
    itinerary: ["Bangalore", "Mysore", "Coorg"]
  }
];

const Tourists = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'info';
      case 'safe': return 'safe';
      case 'alert': return 'emergency';
      case 'monitoring': return 'warning';
      default: return 'secondary';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'safe';
      case 'medium': return 'warning';
      case 'high': return 'emergency';
      default: return 'secondary';
    }
  };

  const filteredTourists = touristsData.filter(tourist => {
    const matchesSearch = tourist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tourist.nationality.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tourist.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tourist.status === statusFilter;
    const matchesRisk = riskFilter === 'all' || tourist.riskLevel === riskFilter;
    
    return matchesSearch && matchesStatus && matchesRisk;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tourist Management</h1>
            <p className="text-muted-foreground">
              Monitor and manage registered tourists with blockchain verification
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Tourists</p>
                  <p className="text-2xl font-bold text-foreground">{touristsData.length}</p>
                </div>
                <div className="p-2 bg-info/20 rounded-lg">
                  <Shield className="h-5 w-5 text-info" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Now</p>
                  <p className="text-2xl font-bold text-foreground">
                    {touristsData.filter(t => t.status === 'active').length}
                  </p>
                </div>
                <div className="p-2 bg-safe/20 rounded-lg">
                  <MapPin className="h-5 w-5 text-safe" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">High Risk</p>
                  <p className="text-2xl font-bold text-foreground">
                    {touristsData.filter(t => t.riskLevel === 'high').length}
                  </p>
                </div>
                <div className="p-2 bg-emergency/20 rounded-lg">
                  <Shield className="h-5 w-5 text-emergency" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Need Attention</p>
                  <p className="text-2xl font-bold text-foreground">
                    {touristsData.filter(t => t.status === 'alert' || t.status === 'monitoring').length}
                  </p>
                </div>
                <div className="p-2 bg-warning/20 rounded-lg">
                  <Phone className="h-5 w-5 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Search & Filter</CardTitle>
            <CardDescription>
              Find tourists by name, nationality, or location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tourists..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="safe">Safe</SelectItem>
                  <SelectItem value="alert">Alert</SelectItem>
                  <SelectItem value="monitoring">Monitoring</SelectItem>
                </SelectContent>
              </Select>

              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tourists Table */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Registered Tourists</CardTitle>
            <CardDescription>
              Complete list of tourists with blockchain verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tourist Details</TableHead>
                    <TableHead>Blockchain ID</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTourists.map((tourist) => (
                    <TableRow key={tourist.id} className="hover:bg-secondary/50">
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium text-foreground">{tourist.name}</p>
                          <p className="text-sm text-muted-foreground">{tourist.nationality}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {tourist.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-secondary/50 px-2 py-1 rounded">
                          {tourist.blockchainId}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{tourist.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>{tourist.checkIn} - {tourist.checkOut}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary"
                          className={`bg-${getStatusColor(tourist.status)}/20 text-${getStatusColor(tourist.status)} border-${getStatusColor(tourist.status)}/30`}
                        >
                          {tourist.status.charAt(0).toUpperCase() + tourist.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={`border-${getRiskColor(tourist.riskLevel)} text-${getRiskColor(tourist.riskLevel)}`}
                        >
                          {tourist.riskLevel.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <MapPin className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Tourists;