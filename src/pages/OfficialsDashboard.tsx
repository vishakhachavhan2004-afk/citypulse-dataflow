import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Users,
  MapPin,
  BarChart3,
  Activity,
  Construction
} from 'lucide-react';

const OfficialsDashboard = () => {
  const projects = [
    {
      id: '1',
      name: 'Metro Line Extension - Phase 2',
      status: 'ongoing',
      progress: 68,
      budget: '$2.4M',
      deadline: '2024-06-15',
      priority: 'high',
      department: 'Transportation'
    },
    {
      id: '2',
      name: 'Downtown Power Grid Upgrade',
      status: 'completed',
      progress: 100,
      budget: '$890K',
      deadline: '2024-01-15',
      priority: 'medium',
      department: 'Utilities'
    },
    {
      id: '3',
      name: 'Bridge Safety Inspection',
      status: 'delayed',
      progress: 45,
      budget: '$340K',
      deadline: '2024-03-01',
      priority: 'high',
      department: 'Infrastructure'
    }
  ];

  const incidents = [
    {
      id: '1',
      type: 'Water Main Break',
      location: 'Main Street & 5th Ave',
      reportedBy: 'citizen',
      timestamp: '2 hours ago',
      status: 'investigating',
      priority: 'high'
    },
    {
      id: '2',
      type: 'Traffic Signal Malfunction',
      location: 'Central Square',
      reportedBy: 'traffic_dept',
      timestamp: '4 hours ago',
      status: 'assigned',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'Sidewalk Damage',
      location: 'Park Avenue',
      reportedBy: 'citizen',
      timestamp: '1 day ago',
      status: 'resolved',
      priority: 'low'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'resolved':
        return 'text-success';
      case 'ongoing':
      case 'assigned':
        return 'text-warning';
      case 'delayed':
      case 'investigating':
        return 'text-danger';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
      case 'resolved':
        return 'default';
      case 'ongoing':
      case 'assigned':
        return 'secondary';
      case 'delayed':
      case 'investigating':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-hero text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Officials Dashboard</h1>
              <p className="text-xl text-white/90">
                Monitor infrastructure projects, manage incidents, and analyze city data
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm">Last Updated</p>
              <p className="text-white font-semibold">Just now</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-success/10 rounded-lg">
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">23</p>
                  <p className="text-sm text-muted-foreground">Completed Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-warning/10 rounded-lg">
                  <Construction className="h-8 w-8 text-warning" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">12</p>
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-danger/10 rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-danger" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">7</p>
                  <p className="text-sm text-muted-foreground">Active Incidents</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">247</p>
                  <p className="text-sm text-muted-foreground">Citizen Reports</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Project Management */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span>Active Projects</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">{project.department}</p>
                      </div>
                      <Badge variant={getStatusBadge(project.status)}>
                        {project.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Budget: </span>
                          <span className="font-medium">{project.budget}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Deadline: </span>
                          <span className="font-medium">{project.deadline}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Incident Management */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <span>Recent Incidents</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incidents.map((incident) => (
                  <div key={incident.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{incident.type}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {incident.location}
                        </div>
                      </div>
                      <Badge variant={getStatusBadge(incident.status)}>
                        {incident.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Reported by: {incident.reportedBy.replace('_', ' ')}</span>
                      <span>{incident.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4" variant="outline">
                View All Incidents
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Section */}
        <Card className="shadow-card mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>City Analytics & Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-gradient-success p-6 rounded-lg text-white mb-4">
                  <h3 className="text-2xl font-bold">94%</h3>
                  <p className="text-sm opacity-90">Issue Resolution Rate</p>
                </div>
                <p className="text-sm text-muted-foreground">↗ 3% from last month</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-hero p-6 rounded-lg text-white mb-4">
                  <h3 className="text-2xl font-bold">2.1 days</h3>
                  <p className="text-sm opacity-90">Avg Response Time</p>
                </div>
                <p className="text-sm text-muted-foreground">↘ 0.3 days improvement</p>
              </div>
              
              <div className="text-center">
                <div className="bg-card border border-border p-6 rounded-lg mb-4">
                  <h3 className="text-2xl font-bold text-foreground">$4.2M</h3>
                  <p className="text-sm text-muted-foreground">Budget Utilized</p>
                </div>
                <p className="text-sm text-muted-foreground">68% of annual budget</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OfficialsDashboard;