import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import HealthCard from '@/components/HealthCard';
import { 
  Heart, 
  Activity, 
  Phone, 
  Video, 
  MessageSquare, 
  Calendar, 
  MapPin, 
  Clock, 
  Pill, 
  Users, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  Camera,
  Bell,
  Share
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FamilyDashboard = () => {
  const { toast } = useToast();

  const patientInfo = {
    name: 'Eleanor Thompson',
    age: 78,
    relationship: 'Mother',
    location: 'Living Room - 123 Oak Street',
    lastActive: '15 minutes ago',
    emergencyContacts: [
      { name: 'Michael Thompson', relationship: 'Son', phone: '+1 (555) 234-5678', primary: true },
      { name: 'Sarah Wilson', relationship: 'Daughter', phone: '+1 (555) 345-6789' },
      { name: 'Dr. Robert Kim', relationship: 'Primary Care', phone: '+1 (555) 123-4567' }
    ]
  };

  const healthMetrics = [
    { title: 'Heart Rate', value: '72 bpm', icon: Heart, variant: 'success' as const, trend: 'stable' as const, trendValue: 'Normal' },
    { title: 'Blood Pressure', value: '120/80', icon: Activity, variant: 'success' as const, trend: 'stable' as const, trendValue: 'Good' },
    { title: 'Daily Steps', value: '3,247', icon: Activity, variant: 'warning' as const, trend: 'down' as const, trendValue: 'Below goal' },
    { title: 'Sleep Quality', value: '7.2 hrs', icon: Clock, variant: 'success' as const, trend: 'up' as const, trendValue: 'Improved' },
  ];

  const recentActivities = [
    { time: '2:30 PM', activity: 'Completed afternoon medication', type: 'medication', status: 'completed' },
    { time: '1:45 PM', activity: 'Finished crossword puzzle', type: 'cognitive', status: 'completed' },
    { time: '12:00 PM', activity: 'Had lunch with neighbor', type: 'social', status: 'completed' },
    { time: '10:30 AM', activity: 'Morning walk in garden', type: 'physical', status: 'completed' },
    { time: '8:00 AM', activity: 'Took morning medications', type: 'medication', status: 'completed' },
  ];

  const upcomingEvents = [
    { time: '4:00 PM Today', event: 'Video call with Sarah', type: 'call' },
    { time: '6:00 PM Today', event: 'Evening medication reminder', type: 'medication' },
    { time: '10:00 AM Tomorrow', event: 'Doctor appointment - Dr. Kim', type: 'appointment' },
    { time: '2:00 PM Tomorrow', event: 'Physical therapy session', type: 'therapy' },
  ];

  const medicationStatus = {
    today: { taken: 3, total: 4, missed: 0 },
    thisWeek: { compliance: 92 },
    nextDue: { name: 'Metformin', time: '6:00 PM', dosage: '500mg' }
  };

  const handleContactCall = (contact: typeof patientInfo.emergencyContacts[0]) => {
    toast({
      title: "Initiating Call",
      description: `Calling ${contact.name} at ${contact.phone}`,
    });
  };

  const handleVideoCall = () => {
    toast({
      title: "Video Call Started",
      description: "Connecting to Eleanor Thompson...",
    });
  };

  const handleSendMessage = () => {
    toast({
      title: "Message Sent",
      description: "Your message has been delivered to Eleanor.",
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'medication': return <Pill className="h-4 w-4 text-primary" />;
      case 'cognitive': return <FileText className="h-4 w-4 text-success" />;
      case 'social': return <Users className="h-4 w-4 text-warning" />;
      case 'physical': return <Activity className="h-4 w-4 text-emergency" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'call': return <Video className="h-4 w-4 text-primary" />;
      case 'medication': return <Pill className="h-4 w-4 text-warning" />;
      case 'appointment': return <Calendar className="h-4 w-4 text-emergency" />;
      case 'therapy': return <Activity className="h-4 w-4 text-success" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header with Patient Info */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">ET</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{patientInfo.name}</h1>
            <p className="text-muted-foreground">Your {patientInfo.relationship} • Age {patientInfo.age}</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{patientInfo.location}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <Clock className="h-4 w-4 text-success" />
                <span>Active {patientInfo.lastActive}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button onClick={handleVideoCall}>
            <Video className="h-4 w-4 mr-2" />
            Video Call
          </Button>
          <Button variant="outline" onClick={handleSendMessage}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Message
          </Button>
          <Button variant="outline">
            <Share className="h-4 w-4 mr-2" />
            Share Updates
          </Button>
        </div>
      </div>

      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((metric, index) => (
          <HealthCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Medication Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Pill className="h-5 w-5 text-primary" />
              <span>Medication Tracking</span>
            </CardTitle>
            <CardDescription>
              Monitor medication adherence and schedule
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-success">{medicationStatus.today.taken}</div>
                <div className="text-sm text-muted-foreground">Taken Today</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-muted-foreground">{medicationStatus.today.total - medicationStatus.today.taken}</div>
                <div className="text-sm text-muted-foreground">Remaining</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-success">{medicationStatus.thisWeek.compliance}%</div>
                <div className="text-sm text-muted-foreground">Weekly Compliance</div>
              </div>
            </div>

            <Separator />

            <div className="p-3 bg-warning-soft border border-warning/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Next Medication Due</div>
                  <div className="text-sm text-muted-foreground">
                    {medicationStatus.nextDue.name} • {medicationStatus.nextDue.dosage}
                  </div>
                </div>
                <Badge variant="outline" className="border-warning text-warning">
                  {medicationStatus.nextDue.time}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-primary" />
              <span>Emergency Contacts</span>
            </CardTitle>
            <CardDescription>
              Quick access to care team members
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {patientInfo.emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{contact.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {contact.relationship}
                      {contact.primary && (
                        <Badge variant="secondary" className="ml-2 text-xs">Primary</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleContactCall(contact)}
                >
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Recent Activities</span>
            </CardTitle>
            <CardDescription>
              Track daily activities and milestones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border-l-2 border-l-success">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{activity.activity}</div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                  <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Upcoming Events</span>
            </CardTitle>
            <CardDescription>
              Stay informed about scheduled activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getEventIcon(event.type)}
                    <div>
                      <div className="text-sm font-medium">{event.event}</div>
                      <div className="text-xs text-muted-foreground">{event.time}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Bell className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <Button className="w-full" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              View Full Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FamilyDashboard;