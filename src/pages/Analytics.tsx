import React from 'react';
import { TrendingUp, Users, AlertTriangle, MapPin, Calendar, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Mock analytics data
const incidentsByTime = [
  { hour: '00:00', incidents: 2 },
  { hour: '04:00', incidents: 1 },
  { hour: '08:00', incidents: 5 },
  { hour: '12:00', incidents: 8 },
  { hour: '16:00', incidents: 12 },
  { hour: '20:00', incidents: 7 },
];

const incidentsByLocation = [
  { location: 'Mumbai', incidents: 45, resolved: 38 },
  { location: 'Delhi', incidents: 38, resolved: 32 },
  { location: 'Goa', incidents: 22, resolved: 20 },
  { location: 'Agra', incidents: 18, resolved: 15 },
  { location: 'Jaipur', incidents: 15, resolved: 13 },
];

const incidentsByType = [
  { name: 'SOS Alert', value: 35, color: '#ef4444' },
  { name: 'Geo-fence Breach', value: 28, color: '#f59e0b' },
  { name: 'Medical Emergency', value: 20, color: '#8b5cf6' },
  { name: 'Missing Person', value: 12, color: '#06b6d4' },
  { name: 'Anomaly Detection', value: 25, color: '#10b981' },
];

const touristDemographics = [
  { nationality: 'USA', count: 342, percentage: 24 },
  { nationality: 'UK', count: 286, percentage: 20 },
  { nationality: 'Canada', count: 215, percentage: 15 },
  { nationality: 'Australia', count: 189, percentage: 13 },
  { nationality: 'Germany', count: 156, percentage: 11 },
  { nationality: 'Others', count: 245, percentage: 17 },
];

const responseMetrics = [
  { metric: 'Average Response Time', value: '8.5 minutes', change: '-12%', trend: 'positive' },
  { metric: 'Resolution Rate', value: '94.2%', change: '+3%', trend: 'positive' },
  { metric: 'Alert Accuracy', value: '89.7%', change: '+5%', trend: 'positive' },
  { metric: 'Tourist Satisfaction', value: '4.6/5.0', change: '+0.2', trend: 'positive' },
];

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
            <p className="text-muted-foreground">
              Comprehensive insights into tourist safety patterns and incident response
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-info text-info">
              Last 30 Days
            </Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {responseMetrics.map((metric, index) => (
            <Card key={index} className="bg-gradient-card border-border shadow-card">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{metric.metric}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className={`h-3 w-3 ${metric.trend === 'positive' ? 'text-safe' : 'text-emergency'}`} />
                    <span className={`text-xs ${metric.trend === 'positive' ? 'text-safe' : 'text-emergency'}`}>
                      {metric.change} from last month
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Incidents by Time */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <BarChart3 className="h-5 w-5 text-info" />
                Incidents by Time of Day
              </CardTitle>
              <CardDescription>
                Peak incident hours and patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incidentsByTime}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="hour" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="incidents" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Incidents by Type */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Incidents by Type
              </CardTitle>
              <CardDescription>
                Distribution of different incident categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={incidentsByType}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(Number(percent) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {incidentsByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location Analytics */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <MapPin className="h-5 w-5 text-info" />
              Incidents by Location
            </CardTitle>
            <CardDescription>
              Geographic distribution and resolution rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incidentsByLocation} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="location" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="incidents" fill="hsl(var(--warning))" name="Total Incidents" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="resolved" fill="hsl(var(--safe))" name="Resolved" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tourist Demographics */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Users className="h-5 w-5 text-info" />
              Tourist Demographics
            </CardTitle>
            <CardDescription>
              Visitor nationality breakdown and statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {touristDemographics.map((demo, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-medium text-foreground min-w-[100px]">
                      {demo.nationality}
                    </div>
                    <div className="flex-1 max-w-xs">
                      <Progress value={demo.percentage} className="h-2" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">{demo.count}</div>
                    <div className="text-xs text-muted-foreground">{demo.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights Summary */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingUp className="h-5 w-5 text-safe" />
              Key Insights & Recommendations
            </CardTitle>
            <CardDescription>
              AI-powered analysis and suggested actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Trending Patterns</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-info/10 border border-info/20 rounded-lg">
                    <div className="h-2 w-2 bg-info rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Peak hours: 4 PM - 8 PM</p>
                      <p className="text-muted-foreground">Consider increasing patrol coverage during these hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <div className="h-2 w-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Mumbai incidents rising</p>
                      <p className="text-muted-foreground">15% increase in alerts compared to last month</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Recommendations</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-safe/10 border border-safe/20 rounded-lg">
                    <div className="h-2 w-2 bg-safe rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Deploy mobile units</p>
                      <p className="text-muted-foreground">Strategic positioning during peak times can reduce response time by 20%</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Update risk zones</p>
                      <p className="text-muted-foreground">Review and update geo-fence boundaries based on recent incident data</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;