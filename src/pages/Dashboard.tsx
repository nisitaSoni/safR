import React from 'react';
import { Users, AlertTriangle, MapPin, Shield, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Mock data for dashboard
const stats = [
  {
    title: "Active Tourists",
    value: "2,847",
    icon: Users,
    change: "+12%",
    changeType: "positive" as const,
    color: "info"
  },
  {
    title: "Active Alerts",
    value: "23",
    icon: AlertTriangle,
    change: "-8%",
    changeType: "negative" as const,
    color: "emergency"
  },
  {
    title: "Risk Zones",
    value: "7",
    icon: MapPin,
    change: "No change",
    changeType: "neutral" as const,
    color: "warning"
  },
  {
    title: "Response Time",
    value: "4.2m",
    icon: Clock,
    change: "-12%",
    changeType: "positive" as const,
    color: "safe"
  }
];

const recentAlerts = [
  {
    id: "ALT-001",
    type: "SOS Alert",
    tourist: "Sarah Johnson",
    location: "Marine Drive, Mumbai",
    time: "2 minutes ago",
    severity: "high",
    status: "assigned"
  },
  {
    id: "ALT-002", 
    type: "Geo-fence Breach",
    tourist: "Mike Chen",
    location: "Old City, Delhi",
    time: "15 minutes ago",
    severity: "medium",
    status: "investigating"
  },
  {
    id: "ALT-003",
    type: "Medical Emergency",
    tourist: "Emma Wilson",
    location: "Goa Beach Resort",
    time: "1 hour ago",
    severity: "high",
    status: "resolved"
  },
  {
    id: "ALT-004",
    type: "Anomaly Detection",
    tourist: "David Kumar",
    location: "Taj Mahal Area",
    time: "2 hours ago",
    severity: "low",
    status: "monitoring"
  }
];

const Dashboard = () => {
  const userRole = localStorage.getItem('userRole') as 'police' | 'tourism';

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
      case 'resolved': return 'safe';
      case 'assigned': return 'info';
      case 'investigating': return 'warning';
      case 'monitoring': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome to SafeTrip Command Center
          </h1>
          <p className="text-muted-foreground">
            Real-time monitoring and response system for tourist safety - {userRole?.toUpperCase()} Department
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-${stat.color}/20`}>
                  <stat.icon className={`h-4 w-4 text-${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <TrendingUp className={`h-3 w-3 ${
                    stat.changeType === 'positive' 
                      ? 'text-safe' 
                      : stat.changeType === 'negative' 
                        ? 'text-emergency' 
                        : 'text-muted-foreground'
                  }`} />
                  <span className={
                    stat.changeType === 'positive' 
                      ? 'text-safe' 
                      : stat.changeType === 'negative' 
                        ? 'text-emergency' 
                        : 'text-muted-foreground'
                  }>
                    {stat.change} from last week
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Alerts */}
          <Card className="lg:col-span-2 bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <AlertTriangle className="h-5 w-5 text-emergency" />
                Recent Alerts
              </CardTitle>
              <CardDescription>
                Latest safety incidents requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`border-${getSeverityColor(alert.severity)} text-${getSeverityColor(alert.severity)}`}>
                          {alert.type}
                        </Badge>
                        <span className="text-sm font-medium text-foreground">
                          {alert.tourist}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {alert.location}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {alert.time}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant="secondary" 
                        className={`bg-${getStatusColor(alert.status)}/20 text-${getStatusColor(alert.status)} border-${getStatusColor(alert.status)}/30`}
                      >
                        {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Shield className="h-5 w-5 text-safe" />
                System Status
              </CardTitle>
              <CardDescription>
                Real-time system health monitoring
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Location Tracking</span>
                  <span className="text-safe font-medium">Online</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Alert System</span>
                  <span className="text-safe font-medium">Active</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Database Sync</span>
                  <span className="text-warning font-medium">Syncing</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Response Units</span>
                  <span className="text-safe font-medium">Ready</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 bg-safe rounded-full animate-pulse"></div>
                  <span className="text-muted-foreground">
                    All systems operational
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
            <CardDescription>
              Frequently used emergency response tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-lg transition-colors group">
                <Users className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-foreground">View All Tourists</p>
              </button>
              
              <button className="p-4 bg-emergency/20 hover:bg-emergency/30 border border-emergency/30 rounded-lg transition-colors group">
                <AlertTriangle className="h-6 w-6 text-emergency mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-foreground">Emergency Alerts</p>
              </button>
              
              <button className="p-4 bg-info/20 hover:bg-info/30 border border-info/30 rounded-lg transition-colors group">
                <MapPin className="h-6 w-6 text-info mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-foreground">Live Map View</p>
              </button>
              
              <button className="p-4 bg-safe/20 hover:bg-safe/30 border border-safe/30 rounded-lg transition-colors group">
                <TrendingUp className="h-6 w-6 text-safe mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-foreground">Analytics Report</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;