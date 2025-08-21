import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Navigation, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  Clock
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
  const [activeLayer, setActiveLayer] = useState('all');

  // Nashik infrastructure data
  const markers: MapMarker[] = [
    {
      id: '1',
      type: 'project',
      status: 'completed',
      title: 'Nashik-Pune Highway Widening',
      description: 'NH-50 widening project completed, reducing travel time by 30%',
      location: { lat: 19.9975, lng: 73.7898 },
      timestamp: '2024-01-10'
    },
    {
      id: '2',
      type: 'project',
      status: 'ongoing',
      title: 'Metro Neo Project - Phase 1',
      description: 'Nashik Metro Neo construction in progress - Connecting major areas',
      location: { lat: 20.0059, lng: 73.7847 },
      timestamp: '2024-01-18'
    },
    {
      id: '3',
      type: 'project',
      status: 'completed',
      title: 'Godavari Riverfront Development',
      description: 'Beautiful riverfront promenade completed near Ramkund',
      location: { lat: 19.9985, lng: 73.7911 },
      timestamp: '2024-01-05'
    },
    {
      id: '4',
      type: 'project',
      status: 'ongoing',
      title: 'Smart City WiFi Network',
      description: 'City-wide free WiFi installation - 60% complete',
      location: { lat: 20.0063, lng: 73.7868 },
      timestamp: '2024-01-22'
    },
    {
      id: '5',
      type: 'hazard',
      status: 'hazard',
      title: 'Waterlogging at College Road',
      description: 'Heavy rains causing waterlogging, traffic diverted',
      location: { lat: 19.9923, lng: 73.7898 },
      timestamp: '2024-01-25'
    },
    {
      id: '6',
      type: 'report',
      status: 'reported',
      title: 'Street Light Issue - Panchavati',
      description: 'Multiple street lights not working near Panchavati area',
      location: { lat: 20.0154, lng: 73.7795 },
      timestamp: '2024-01-24'
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

  const filteredMarkers = markers.filter(marker => {
    if (activeLayer === 'all') return true;
    if (activeLayer === 'projects') return marker.type === 'project';
    if (activeLayer === 'hazards') return marker.status === 'hazard';
    return true;
  });

  const completedProjects = markers.filter(m => m.status === 'completed').length;
  const ongoingProjects = markers.filter(m => m.status === 'ongoing').length;
  const activeHazards = markers.filter(m => m.status === 'hazard').length;

  const layers = [
    { id: 'all', name: 'All Infrastructure', count: markers.length },
    { id: 'projects', name: 'Projects Only', count: markers.filter(m => m.type === 'project').length },
    { id: 'hazards', name: 'Hazards & Alerts', count: markers.filter(m => m.status === 'hazard').length },
  ];

  return (
    <div className="relative h-full">
      {/* Nashik Map Interface */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-success/5">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-card/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Navigation className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Nashik CityPulse</h1>
                <p className="text-sm text-muted-foreground">Infrastructure & Urban Monitoring</p>
              </div>
            </div>
          </div>
        </div>

        {/* Static Map Representation */}
        <div className="absolute inset-0 pt-20">
          <div className="h-full w-full bg-muted/10 relative overflow-hidden">
            {/* Map Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Nashik Areas Representation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-4xl h-full max-h-96">
                {/* Mock Areas */}
                <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">Panchavati</span>
                </div>
                <div className="absolute top-1/2 left-1/2 w-20 h-16 bg-success/20 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-medium text-success">City Center</span>
                </div>
                <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-warning/20 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-medium text-warning">College Road</span>
                </div>

                {/* Project Markers */}
                {filteredMarkers.map((marker, index) => (
                  <div 
                    key={marker.id}
                    className={`absolute w-6 h-6 ${getMarkerColor(marker.status)} rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform`}
                    style={{
                      left: `${20 + (index * 15)}%`,
                      top: `${30 + (index * 10)}%`
                    }}
                    title={marker.title}
                  >
                    {getStatusIcon(marker.status)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layer Controls */}
      <div className="absolute top-24 left-4 z-10">
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
      <div className="absolute top-24 right-4 z-10">
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
                <p className="text-2xl font-bold text-foreground">{completedProjects}</p>
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
                <p className="text-2xl font-bold text-foreground">{ongoingProjects}</p>
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
                <p className="text-2xl font-bold text-foreground">{activeHazards}</p>
                <p className="text-sm text-muted-foreground">Active Hazards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityMap;