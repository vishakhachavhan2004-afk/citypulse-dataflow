import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bell, 
  AlertTriangle, 
  Camera, 
  MapPin, 
  Clock,
  CheckCircle2,
  Zap,
  Car,
  Droplets,
  Construction
} from 'lucide-react';

const CitizenPortal = () => {
  const [reportForm, setReportForm] = useState({
    category: '',
    location: '',
    description: '',
    priority: 'medium'
  });

  const alerts = [
    {
      id: '1',
      type: 'power',
      title: 'Scheduled Power Outage',
      description: 'Power maintenance in District 5 from 2 PM - 6 PM today',
      timestamp: '2 hours ago',
      severity: 'medium',
      icon: Zap,
      color: 'warning'
    },
    {
      id: '2',
      type: 'traffic',
      title: 'Road Closure - Main Street',
      description: 'Emergency water main repair causing delays. Use alternate routes.',
      timestamp: '45 minutes ago',
      severity: 'high',
      icon: Car,
      color: 'danger'
    },
    {
      id: '3',
      type: 'construction',
      title: 'Metro Construction Update',
      description: 'Phase 2 of Line Extension ahead of schedule. Reduced service on weekends.',
      timestamp: '1 day ago',
      severity: 'low',
      icon: Construction,
      color: 'success'
    }
  ];

  const categories = [
    { id: 'road', name: 'Roads & Transportation', icon: Car, color: 'bg-primary' },
    { id: 'power', name: 'Electricity & Power', icon: Zap, color: 'bg-warning' },
    { id: 'water', name: 'Water & Sewage', icon: Droplets, color: 'bg-success' },
    { id: 'hazard', name: 'Safety Hazard', icon: AlertTriangle, color: 'bg-danger' }
  ];

  const getBadgeVariant = (color: string) => {
    switch (color) {
      case 'success': return 'default';
      case 'warning': return 'secondary'; 
      case 'danger': return 'destructive';
      default: return 'default';
    }
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Report submitted:', reportForm);
    // Here you would typically submit to your backend
    setReportForm({ category: '', location: '', description: '', priority: 'medium' });
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-hero text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Citizen Portal</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Stay informed with real-time alerts and help improve your city by reporting issues directly to local authorities.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Alerts Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <span>Live Alerts & Updates</span>
                  <Badge variant="secondary" className="ml-auto">
                    {alerts.length} Active
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {alerts.map((alert) => {
                  const Icon = alert.icon;
                  return (
                    <div
                      key={alert.id}
                      className="border border-border rounded-lg p-4 hover:shadow-card transition-smooth"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-2 rounded-lg ${
                          alert.color === 'warning' ? 'bg-warning/10' :
                          alert.color === 'danger' ? 'bg-danger/10' :
                          alert.color === 'success' ? 'bg-success/10' :
                          'bg-primary/10'
                        }`}>
                          <Icon className={`h-5 w-5 ${
                            alert.color === 'warning' ? 'text-warning' :
                            alert.color === 'danger' ? 'text-danger' :
                            alert.color === 'success' ? 'text-success' :
                            'text-primary'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-foreground">{alert.title}</h3>
                            <Badge variant={getBadgeVariant(alert.color)} className="text-xs">
                              {alert.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">
                            {alert.description}
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {alert.timestamp}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Report Issue Section */}
          <div>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <span>Report an Issue</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitReport} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Issue Category
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <Button
                            key={category.id}
                            type="button"
                            variant={reportForm.category === category.id ? "default" : "outline"}
                            onClick={() => setReportForm({ ...reportForm, category: category.id })}
                            className="h-auto p-3 flex-col space-y-1"
                          >
                            <Icon className="h-5 w-5" />
                            <span className="text-xs text-center">{category.name}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter location or use GPS"
                        value={reportForm.location}
                        onChange={(e) => setReportForm({ ...reportForm, location: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Description
                    </label>
                    <Textarea
                      placeholder="Describe the issue in detail..."
                      value={reportForm.description}
                      onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button type="button" variant="outline" className="flex-1">
                      <Camera className="h-4 w-4 mr-2" />
                      Add Photo
                    </Button>
                    <Button type="button" variant="outline" className="flex-1">
                      <MapPin className="h-4 w-4 mr-2" />
                      Use GPS
                    </Button>
                  </div>

                  <Button type="submit" className="w-full bg-gradient-hero">
                    Submit Report
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6 shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Community Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Reports This Month</span>
                    <span className="font-semibold">247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Issues Resolved</span>
                    <span className="font-semibold text-success">189</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg. Response Time</span>
                    <span className="font-semibold">2.3 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenPortal;