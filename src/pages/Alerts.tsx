import React, { useState } from 'react';
import { AlertTriangle, Clock, User, MapPin, CheckCircle, XCircle, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useToast } from '@/hooks/use-toast';

// Mock alerts data
const alertsData = [
  {
    id: "ALT-001",
    type: "SOS Alert",
    tourist: { name: "Sarah Johnson", id: "TUR-001", phone: "+1-555-0123" },
    location: { name: "Marine Drive, Mumbai", lat: 19.0760, lng: 72.8777 },
    timestamp: "2024-01-20T14:30:00Z",
    severity: "high",
    status: "active",
    description: "Emergency button pressed on mobile device. GPS location transmitted.",
    responder: null,
    responseTime: null
  },
  {
    id: "ALT-002",
    type: "Geo-fence Breach",
    tourist: { name: "Mike Chen", id: "TUR-002", phone: "+1-604-555-0156" },
    location: { name: "Old City, Delhi", lat: 28.6139, lng: 77.2090 },
    timestamp: "2024-01-20T14:15:00Z",
    severity: "medium",
    status: "assigned",
    description: "Tourist entered high-risk zone without authorization. Automatic alert triggered.",
    responder: "Officer Kumar",
    responseTime: "5 minutes"
  },
  {
    id: "ALT-003",
    type: "Medical Emergency",
    tourist: { name: "Emma Wilson", id: "TUR-003", phone: "+44-20-7946-0958" },
    location: { name: "Calangute Beach, Goa", lat: 15.2993, lng: 74.1240 },
    timestamp: "2024-01-20T13:45:00Z",
    severity: "high",
    status: "resolved",
    description: "Tourist reported injury at beach location. Medical assistance requested.",
    responder: "Dr. Patel",
    responseTime: "8 minutes"
  },
  {
    id: "ALT-004",
    type: "Anomaly Detection",
    tourist: { name: "David Kumar", id: "TUR-004", phone: "+61-2-9876-5432" },
    location: { name: "Taj Mahal, Agra", lat: 27.1751, lng: 78.0421 },
    timestamp: "2024-01-20T12:30:00Z",
    severity: "low",
    status: "investigating",
    description: "Unusual movement pattern detected. Possible device malfunction or safety concern.",
    responder: "Agent Singh",
    responseTime: "15 minutes"
  },
  {
    id: "ALT-005",
    type: "Missing Person",
    tourist: { name: "Lisa Zhang", id: "TUR-005", phone: "+65-6123-4567" },
    location: { name: "Last seen: Palace Road, Mysore", lat: 12.2958, lng: 76.6394 },
    timestamp: "2024-01-20T11:00:00Z",
    severity: "high",
    status: "active",
    description: "Tourist has not checked in for 6+ hours. Last known location recorded.",
    responder: null,
    responseTime: null
  }
];

const Alerts = () => {
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [responderName, setResponderName] = useState('');
  const [responseNotes, setResponseNotes] = useState('');
  const { toast } = useToast();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'emergency';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'emergency';
      case 'assigned': return 'warning';
      case 'investigating': return 'info';
      case 'resolved': return 'safe';
      default: return 'secondary';
    }
  };

  const filteredAlerts = alertsData.filter(alert => {
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    return matchesStatus && matchesSeverity;
  });

  const handleAssignResponder = () => {
    if (!responderName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a responder name",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Responder assigned",
      description: `${responderName} has been assigned to alert ${selectedAlert?.id}`,
    });
    
    setResponderName('');
    setSelectedAlert(null);
  };

  const handleResolveAlert = () => {
    toast({
      title: "Alert resolved",
      description: `Alert ${selectedAlert?.id} has been marked as resolved`,
    });
    
    setResponseNotes('');
    setSelectedAlert(null);
  };

  const generateEFIR = (alert: any) => {
    // Mock E-FIR generation
    toast({
      title: "E-FIR Generated",
      description: `E-FIR document for ${alert.tourist.name} is being prepared for download`,
    });
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Alert Management</h1>
            <p className="text-muted-foreground">
              Monitor and respond to tourist safety incidents in real-time
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground">
            <Download className="h-4 w-4 mr-2" />
            Export Alerts
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                  <p className="text-2xl font-bold text-emergency">
                    {alertsData.filter(a => a.status === 'active').length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-emergency" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Assigned</p>
                  <p className="text-2xl font-bold text-warning">
                    {alertsData.filter(a => a.status === 'assigned' || a.status === 'investigating').length}
                  </p>
                </div>
                <User className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolved Today</p>
                  <p className="text-2xl font-bold text-safe">
                    {alertsData.filter(a => a.status === 'resolved').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-safe" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Response</p>
                  <p className="text-2xl font-bold text-info">8.5m</p>
                </div>
                <Clock className="h-8 w-8 text-info" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Filter className="h-5 w-5" />
              Filter Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredAlerts.map((alert) => (
            <Card key={alert.id} className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-foreground">{alert.type}</h3>
                          <Badge 
                            variant="outline"
                            className={`border-${getSeverityColor(alert.severity)} text-${getSeverityColor(alert.severity)}`}
                          >
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <Badge 
                            variant="secondary"
                            className={`bg-${getStatusColor(alert.status)}/20 text-${getStatusColor(alert.status)} border-${getStatusColor(alert.status)}/30`}
                          >
                            {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Alert ID: {alert.id}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-foreground">{alert.tourist.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{alert.location.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{formatTimestamp(alert.timestamp)}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {alert.responder && (
                          <div className="text-sm">
                            <span className="text-muted-foreground">Responder: </span>
                            <span className="font-medium text-foreground">{alert.responder}</span>
                          </div>
                        )}
                        {alert.responseTime && (
                          <div className="text-sm">
                            <span className="text-muted-foreground">Response Time: </span>
                            <span className="font-medium text-foreground">{alert.responseTime}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground bg-secondary/30 p-3 rounded-lg">
                      {alert.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 min-w-[120px]">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          className="bg-gradient-primary hover:opacity-90 text-primary-foreground"
                          onClick={() => setSelectedAlert(alert)}
                        >
                          Manage
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Manage Alert: {alert.id}</DialogTitle>
                          <DialogDescription>
                            Assign responder, update status, or resolve the alert
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="responder">Assign Responder</Label>
                            <Input
                              id="responder"
                              value={responderName}
                              onChange={(e) => setResponderName(e.target.value)}
                              placeholder="Enter responder name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="notes">Response Notes</Label>
                            <Textarea
                              id="notes"
                              value={responseNotes}
                              onChange={(e) => setResponseNotes(e.target.value)}
                              placeholder="Add response notes..."
                              rows={3}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleAssignResponder} className="flex-1">
                              Assign
                            </Button>
                            <Button onClick={handleResolveAlert} variant="outline" className="flex-1">
                              Resolve
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {alert.type === 'Missing Person' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => generateEFIR(alert)}
                      >
                        Generate E-FIR
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;