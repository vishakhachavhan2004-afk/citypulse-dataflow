import React, { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Navigation, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Settings
} from 'lucide-react';

interface MapMarker {
  id: string;
  type: 'project' | 'hazard' | 'report';
  status: 'completed' | 'ongoing' | 'hazard' | 'reported';
  title: string;
  description: string;
  location: { lat: number; lng: number };
  timestamp: string;
}

const CityMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const [activeLayer, setActiveLayer] = useState('all');

  // Mock data for demonstration
  const markers: MapMarker[] = [
    {
      id: '1',
      type: 'project',
      status: 'completed',
      title: 'Highway Bridge Renovation',
      description: 'Major bridge renovation completed ahead of schedule',
      location: { lat: 40.7128, lng: -74.0060 },
      timestamp: '2024-01-15'
    },
    {
      id: '2',
      type: 'project',
      status: 'ongoing',
      title: 'Metro Line Extension',
      description: 'New metro line construction - Phase 2 in progress',
      location: { lat: 40.7589, lng: -73.9851 },
      timestamp: '2024-01-20'
    },
    {
      id: '3',
      type: 'hazard',
      status: 'hazard',
      title: 'Road Closure - Water Main Break',
      description: 'Emergency water main repair causing traffic delays',
      location: { lat: 40.7505, lng: -73.9934 },
      timestamp: '2024-01-21'
    }
  ];

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success';
      case 'ongoing': return 'bg-warning';
      case 'hazard': return 'bg-danger';
      case 'reported': return 'bg-primary';
      default: return 'bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4" />;
      case 'ongoing': return <Clock className="h-4 w-4" />;
      case 'hazard': return <AlertTriangle className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const initializeMap = () => {
    if (!mapContainer.current) return;
    
    // For now, show a placeholder map interface
    // Once user adds Mapbox API key, this will be replaced with actual map
  };

  useEffect(() => {
    if (apiKey) {
      initializeMap();
      setShowApiKeyInput(false);
    }
  }, [apiKey]);

  const layers = [
    { id: 'all', name: 'All Infrastructure', count: markers.length },
    { id: 'projects', name: 'Projects Only', count: markers.filter(m => m.type === 'project').length },
    { id: 'hazards', name: 'Hazards & Alerts', count: markers.filter(m => m.status === 'hazard').length },
  ];

  return (
    <div className="relative h-full">
      {/* Map Container */}
      <div ref={mapContainer} className="absolute inset-0 bg-muted/20">
        {showApiKeyInput ? (
          /* API Key Setup */
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-card">
            <div className="bg-card border border-border rounded-xl p-8 shadow-card max-w-md w-full mx-4">
              <div className="text-center mb-6">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Setup Interactive Map</h3>
                <p className="text-muted-foreground text-sm">
                  Enter your Mapbox API key to enable the interactive city map. Get your free key from{' '}
                  <a 
                    href="https://account.mapbox.com/access-tokens/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    mapbox.com
                  </a>
                </p>
              </div>
              
              <div className="space-y-4">
                <Input
                  type="password"
                  placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSI..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="font-mono text-sm"
                />
                <Button 
                  onClick={() => apiKey && setShowApiKeyInput(false)} 
                  className="w-full bg-gradient-hero"
                  disabled={!apiKey}
                >
                  Initialize Map
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* Map Interface */
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-success/5 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="h-24 w-24 bg-gradient-hero rounded-full flex items-center justify-center mx-auto shadow-glow">
                <Navigation className="h-12 w-12 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Interactive City Map</h3>
                <p className="text-muted-foreground">
                  Real-time infrastructure tracking and urban monitoring
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {!showApiKeyInput && (
        <>
          {/* Layer Controls */}
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-card border border-border rounded-lg shadow-card p-3 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-3">
                <Layers className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm text-foreground">Map Layers</span>
              </div>
              <div className="space-y-2">
                {layers.map((layer) => (
                  <Button
                    key={layer.id}
                    variant={activeLayer === layer.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveLayer(layer.id)}
                    className="w-full justify-between text-xs"
                  >
                    <span>{layer.name}</span>
                    <Badge variant="secondary" className="text-xs px-2 py-0">
                      {layer.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-card border border-border rounded-lg shadow-card p-4 backdrop-blur-sm">
              <h4 className="font-medium text-sm text-foreground mb-3">Status Legend</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-success rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-warning rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Ongoing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-danger rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Hazard/Alert</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-primary rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Citizen Report</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-4 shadow-card backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">23</p>
                    <p className="text-sm text-muted-foreground">Projects Completed</p>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 shadow-card backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-warning/10 rounded-lg">
                    <Clock className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">12</p>
                    <p className="text-sm text-muted-foreground">Active Projects</p>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 shadow-card backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-danger/10 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-danger" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">3</p>
                    <p className="text-sm text-muted-foreground">Active Hazards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reset API Key Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowApiKeyInput(true)}
            className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-card border border-border shadow-card"
          >
            <Settings className="h-4 w-4 mr-2" />
            Map Settings
          </Button>
        </>
      )}
    </div>
  );
};

export default CityMap;