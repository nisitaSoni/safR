import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, Users, MapPin, Zap, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useToast } from '@/hooks/use-toast';

// Mock location data
const touristLocations = [
  { id: 1, name: "Sarah Johnson", lat: 19.0760, lng: 72.8777, status: "safe", lastUpdate: "2 mins ago" },
  { id: 2, name: "Mike Chen", lat: 28.6139, lng: 77.2090, status: "alert", lastUpdate: "5 mins ago" },
  { id: 3, name: "Emma Wilson", lat: 15.2993, lng: 74.1240, status: "safe", lastUpdate: "1 min ago" },
  { id: 4, name: "David Kumar", lat: 27.1751, lng: 78.0421, status: "monitoring", lastUpdate: "10 mins ago" },
  { id: 5, name: "Lisa Zhang", lat: 12.2958, lng: 76.6394, status: "safe", lastUpdate: "3 mins ago" }
];

const riskZones = [
  { id: 1, name: "Old Delhi Market", coords: [[28.6562, 77.2410], [28.6500, 77.2350], [28.6520, 77.2300], [28.6580, 77.2360]], level: "high" },
  { id: 2, name: "Mumbai Station Area", coords: [[19.0330, 72.8290], [19.0300, 72.8250], [19.0320, 72.8200], [19.0350, 72.8240]], level: "medium" },
  { id: 3, name: "Goa Beach Zone", coords: [[15.5520, 73.7570], [15.5480, 73.7530], [15.5500, 73.7480], [15.5540, 73.7520]], level: "low" }
];

const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const { toast } = useToast();

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      initializeMap();
      toast({
        title: "Map initialized",
        description: "Mapbox token accepted. Loading tourist locations...",
      });
    } else {
      toast({
        title: "Invalid token",
        description: "Please enter a valid Mapbox access token",
        variant: "destructive",
      });
    }
  };

  const initializeMap = () => {
    // This would normally initialize Mapbox GL JS
    // For demo purposes, we'll show a placeholder
    if (mapContainer.current) {
      mapContainer.current.innerHTML = `
        <div class="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center border border-border">
          <div class="text-center space-y-4">
            <div class="bg-primary/20 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
              <svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <p class="font-medium text-foreground">Interactive Map Loading...</p>
              <p class="text-sm text-muted-foreground">Tourist locations and risk zones will appear here</p>
            </div>
          </div>
        </div>
      `;
    }
  };

  if (showTokenInput) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <Card className="w-full max-w-md bg-gradient-card border-border shadow-card">
            <CardHeader className="text-center">
              <div className="mx-auto bg-gradient-primary rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-foreground">Mapbox Configuration</CardTitle>
              <CardDescription>
                Enter your Mapbox access token to enable live map functionality
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="pk.eyJ1IjoiY..."
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Get your token from{' '}
                  <a 
                    href="https://mapbox.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    mapbox.com
                  </a>
                </p>
              </div>
              
              <Button 
                onClick={handleTokenSubmit} 
                className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground"
              >
                Initialize Map
              </Button>

              <div className="pt-4 border-t border-border">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium">Demo Mode</p>
                    <p className="mt-1">
                      Enter any token to see the demo map interface. Production deployment requires a valid Mapbox token.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Live Map Monitoring</h1>
            <p className="text-muted-foreground">
              Real-time tourist locations, risk zones, and emergency alerts
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Map Settings
            </Button>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 bg-safe rounded-full animate-pulse"></div>
              <span className="text-muted-foreground">Live Tracking</span>
            </div>
          </div>
        </div>

        {/* Map and Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-300px)]">
          {/* Map Container */}
          <div className="lg:col-span-3">
            <Card className="h-full bg-gradient-card border-border shadow-card">
              <CardContent className="p-0 h-full">
                <div ref={mapContainer} className="w-full h-full rounded-lg"></div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tourist Locations */}
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm text-foreground">
                  <Users className="h-4 w-4 text-info" />
                  Active Tourists ({touristLocations.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {touristLocations.map((tourist) => (
                  <div key={tourist.id} className="flex items-center justify-between p-2 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {tourist.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {tourist.lastUpdate}
                      </p>
                    </div>
                    <Badge 
                      variant="secondary"
                      className={`ml-2 text-xs ${
                        tourist.status === 'safe' ? 'bg-safe/20 text-safe border-safe/30' :
                        tourist.status === 'alert' ? 'bg-emergency/20 text-emergency border-emergency/30' :
                        'bg-warning/20 text-warning border-warning/30'
                      }`}
                    >
                      {tourist.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Risk Zones */}
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm text-foreground">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  Risk Zones ({riskZones.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {riskZones.map((zone) => (
                  <div key={zone.id} className="flex items-center justify-between p-2 border border-border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {zone.name}
                      </p>
                    </div>
                    <Badge 
                      variant="outline"
                      className={`ml-2 text-xs ${
                        zone.level === 'high' ? 'border-emergency text-emergency' :
                        zone.level === 'medium' ? 'border-warning text-warning' :
                        'border-info text-info'
                      }`}
                    >
                      {zone.level}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm text-foreground">
                  <Zap className="h-4 w-4 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Emergency Broadcast
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  Add Risk Zone
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Tourist Check-in
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Legend */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-sm text-foreground">Map Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-safe rounded-full"></div>
                <span className="text-sm text-muted-foreground">Safe Tourist</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-emergency rounded-full"></div>
                <span className="text-sm text-muted-foreground">Emergency Alert</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-warning rounded-full"></div>
                <span className="text-sm text-muted-foreground">Under Monitoring</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-info rounded-full"></div>
                <span className="text-sm text-muted-foreground">Risk Zone</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MapView;