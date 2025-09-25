import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import HealthCard from '@/components/HealthCard';
import { 
  Activity, 
  Heart, 
  Thermometer, 
  Droplets, 
  Moon, 
  Footprints, 
  Zap, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Clock,
  Settings,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HealthMonitoring = () => {
  const { toast } = useToast();

  const currentVitals = [
    { title: 'Heart Rate', value: '72 bpm', icon: Heart, variant: 'success' as const, trend: 'stable' as const, trendValue: 'Normal range' },
    { title: 'Blood Pressure', value: '120/80 mmHg', icon: Activity, variant: 'success' as const, trend: 'stable' as const, trendValue: 'Optimal' },
    { title: 'Body Temperature', value: '98.6°F', icon: Thermometer, variant: 'default' as const, trend: 'stable' as const, trendValue: 'Normal' },
    { title: 'Blood Oxygen', value: '98%', icon: Zap, variant: 'success' as const, trend: 'up' as const, trendValue: 'Excellent' },
    { title: 'Blood Sugar', value: '95 mg/dL', icon: Droplets, variant: 'success' as const, trend: 'down' as const, trendValue: '↓ 5% from yesterday' },
    { title: 'Sleep Quality', value: '7.2 hrs', icon: Moon, variant: 'success' as const, trend: 'up' as const, trendValue: 'Deep sleep: 85%' },
    { title: 'Daily Steps', value: '3,247', icon: Footprints, variant: 'warning' as const, trend: 'down' as const, trendValue: 'Goal: 5,000 steps' },
    { title: 'Stress Level', value: 'Low', icon: Activity, variant: 'success' as const, trend: 'stable' as const, trendValue: 'Relaxed state' },
  ];

  const weeklyTrends = [
    { metric: 'Heart Rate', trend: 'stable', change: '+2%', status: 'normal' },
    { metric: 'Blood Pressure', trend: 'improving', change: '-5%', status: 'good' },
    { metric: 'Sleep Duration', trend: 'improving', change: '+12%', status: 'good' },
    { metric: 'Activity Level', trend: 'declining', change: '-8%', status: 'attention' },
    { metric: 'Medication Compliance', trend: 'stable', change: '92%', status: 'good' },
  ];

  const alerts = [
    {
      type: 'reminder',
      title: 'Blood Pressure Check',
      description: 'Due in 2 hours - Evening measurement',
      time: '6:00 PM',
      priority: 'medium'
    },
    {
      type: 'goal',
      title: 'Daily Step Goal',
      description: '1,753 steps remaining to reach daily goal',
      time: 'Today',
      priority: 'low'
    },
    {
      type: 'medication',
      title: 'Medication Reminder',
      description: 'Metformin 500mg due at dinner time',
      time: '6:00 PM',
      priority: 'high'
    }
  ];

  const devices = [
    { name: 'Smart Watch', status: 'connected', battery: 78, lastSync: '2 min ago' },
    { name: 'Blood Pressure Monitor', status: 'connected', battery: 85, lastSync: '1 hour ago' },
    { name: 'Smart Scale', status: 'connected', battery: 92, lastSync: 'This morning' },
    { name: 'Sleep Tracker', status: 'connected', battery: 65, lastSync: '30 min ago' },
    { name: 'Glucose Monitor', status: 'offline', battery: 45, lastSync: '3 hours ago' },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="h-4 w-4 text-success" />;
      case 'declining':
        return <TrendingDown className="h-4 w-4 text-warning" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-emergency/20 bg-emergency-soft';
      case 'medium': return 'border-warning/20 bg-warning-soft';
      case 'low': return 'border-primary/20 bg-primary-soft';
      default: return 'border-border bg-card';
    }
  };

  const handleExportData = () => {
    toast({
      title: "Data Export Initiated",
      description: "Your health data report will be ready for download in a few moments.",
    });
  };

  const handleDeviceSettings = (device: string) => {
    toast({
      title: "Device Settings",
      description: `Opening settings for ${device}...`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Health Monitoring</h1>
          <p className="text-muted-foreground mt-1">Real-time health insights and trends</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-fit">
          <TabsTrigger value="current">Current Vitals</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          {/* Current Vitals */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentVitals.map((vital, index) => (
              <HealthCard key={index} {...vital} />
            ))}
          </div>

          {/* Detailed Charts Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Heart Rate Trends</CardTitle>
                <CardDescription>24-hour heart rate monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <Activity className="h-12 w-12 mx-auto mb-4" />
                    <p>Heart rate chart visualization</p>
                    <p className="text-sm">Real-time monitoring data</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blood Pressure History</CardTitle>
                <CardDescription>Weekly blood pressure readings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                    <p>Blood pressure trend chart</p>
                    <p className="text-sm">Systolic and diastolic readings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Health Trends</CardTitle>
              <CardDescription>
                Track changes in your health metrics over the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyTrends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getTrendIcon(trend.trend)}
                      <div>
                        <div className="font-medium">{trend.metric}</div>
                        <div className="text-sm text-muted-foreground capitalize">
                          {trend.trend} trend
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{trend.change}</div>
                      <Badge 
                        variant={trend.status === 'good' ? 'default' : trend.status === 'attention' ? 'destructive' : 'secondary'}
                      >
                        {trend.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Medication Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">92%</div>
                  <Progress value={92} className="h-2 mb-2" />
                  <p className="text-sm text-muted-foreground">This month</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Activity Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning mb-2">78%</div>
                  <Progress value={78} className="h-2 mb-2" />
                  <p className="text-sm text-muted-foreground">Daily average</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sleep Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">85%</div>
                  <Progress value={85} className="h-2 mb-2" />
                  <p className="text-sm text-muted-foreground">Sleep score</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Health Devices</CardTitle>
              <CardDescription>
                Monitor and manage your health monitoring devices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {devices.map((device, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        device.status === 'connected' ? 'bg-success' : 'bg-destructive'
                      }`} />
                      <div>
                        <div className="font-medium">{device.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Last sync: {device.lastSync}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm">Battery: {device.battery}%</div>
                        <Progress value={device.battery} className="w-20 h-1" />
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeviceSettings(device.name)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Health Alerts & Reminders</CardTitle>
              <CardDescription>
                Stay on top of your health monitoring schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div key={index} className={`p-4 border rounded-lg ${getAlertColor(alert.priority)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium mb-1">{alert.title}</div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {alert.description}
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{alert.time}</span>
                        </div>
                      </div>
                      <Badge 
                        variant={alert.priority === 'high' ? 'destructive' : alert.priority === 'medium' ? 'secondary' : 'outline'}
                      >
                        {alert.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthMonitoring;