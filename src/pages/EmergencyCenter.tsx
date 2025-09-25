import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import EmergencyAlert from '@/components/EmergencyAlert';
import { 
  Shield, 
  Phone, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Heart, 
  Activity, 
  Users, 
  Siren, 
  CheckCircle,
  Camera,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Navigation
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  isAvailable: boolean;
  responseTime: string;
  priority: number;
}

interface ActiveAlert {
  id: string;
  type: 'fall' | 'medical' | 'panic' | 'medication';
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  location: string;
  description: string;
  patientName: string;
  status: 'active' | 'responding' | 'resolved';
}

const EmergencyCenter = () => {
  const [activeCall, setActiveCall] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const { toast } = useToast();

  const emergencyContacts: EmergencyContact[] = [
    {
      id: '1',
      name: 'Dr. Sarah Wilson',
      role: 'Primary Care Physician',
      phone: '+1 (555) 123-4567',
      isAvailable: true,
      responseTime: '< 2 min',
      priority: 1
    },
    {
      id: '2',
      name: 'Michael Thompson',
      role: 'Primary Emergency Contact (Son)',
      phone: '+1 (555) 234-5678',
      isAvailable: true,
      responseTime: '< 1 min',
      priority: 1
    },
    {
      id: '3',
      name: 'Emergency Services',
      role: '911 Dispatcher',
      phone: '911',
      isAvailable: true,
      responseTime: 'Immediate',
      priority: 2
    },
    {
      id: '4',
      name: 'Sarah Thompson',
      role: 'Secondary Emergency Contact (Daughter)',
      phone: '+1 (555) 345-6789',
      isAvailable: false,
      responseTime: '< 5 min',
      priority: 2
    },
    {
      id: '5',
      name: 'Riverside Care Center',
      role: 'Care Facility',
      phone: '+1 (555) 456-7890',
      isAvailable: true,
      responseTime: '< 3 min',
      priority: 3
    }
  ];

  const activeAlerts: ActiveAlert[] = [
    {
      id: '1',
      type: 'fall',
      severity: 'critical',
      timestamp: '2 minutes ago',
      location: 'Living Room - 123 Oak Street',
      description: 'Fall detected with no movement for 30 seconds',
      patientName: 'Eleanor Thompson',
      status: 'active'
    }
  ];

  const recentAlerts: ActiveAlert[] = [
    {
      id: '2',
      type: 'medication',
      severity: 'medium',
      timestamp: '3 hours ago',
      location: 'Kitchen - 123 Oak Street',
      description: 'Missed evening medication - Metformin',
      patientName: 'Eleanor Thompson',
      status: 'resolved'
    },
    {
      id: '3',
      type: 'panic',
      severity: 'high',
      timestamp: '1 day ago',
      location: 'Bedroom - 123 Oak Street',
      description: 'Panic button activated during night',
      patientName: 'Eleanor Thompson',
      status: 'resolved'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-emergency text-emergency-foreground';
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'fall': return <AlertTriangle className="h-5 w-5" />;
      case 'medical': return <Heart className="h-5 w-5" />;
      case 'panic': return <Shield className="h-5 w-5" />;
      case 'medication': return <Clock className="h-5 w-5" />;
      default: return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const handleEmergencyCall = (contact: EmergencyContact) => {
    setActiveCall(true);
    toast({
      title: "Emergency Call Initiated",
      description: `Calling ${contact.name} at ${contact.phone}`,
      variant: "destructive"
    });
  };

  const handleEndCall = () => {
    setActiveCall(false);
    toast({
      title: "Call Ended",
      description: "Emergency call has been terminated.",
    });
  };

  const handleActivateSiren = () => {
    toast({
      title: "Emergency Siren Activated",
      description: "Local emergency siren has been triggered.",
      variant: "destructive"
    });
  };

  const handleLocationServices = () => {
    toast({
      title: "Location Services",
      description: "Sharing precise location with emergency responders.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emergency/10 rounded-lg">
            <Shield className="h-8 w-8 text-emergency" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Emergency Response Center</h1>
            <p className="text-muted-foreground">24/7 Emergency monitoring and rapid response coordination</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-success text-success-foreground animate-pulse">
            System Online
          </Badge>
          <Button 
            onClick={handleActivateSiren}
            className="bg-emergency hover:bg-emergency/90 animate-pulse"
          >
            <Siren className="h-4 w-4 mr-2" />
            Emergency Siren
          </Button>
        </div>
      </div>

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-emergency flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 animate-pulse" />
            <span>ACTIVE EMERGENCY ALERTS</span>
          </h2>
          {activeAlerts.map((alert) => (
            <EmergencyAlert
              key={alert.id}
              patientName={alert.patientName}
              location={alert.location}
              timestamp={alert.timestamp}
              alertType={alert.type}
              isActive={true}
            />
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emergency Contacts */}
        <Card className="border-emergency/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-emergency">
              <Phone className="h-5 w-5" />
              <span>Emergency Contacts</span>
            </CardTitle>
            <CardDescription>
              Immediate access to emergency responders and care team
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {emergencyContacts
              .sort((a, b) => a.priority - b.priority)
              .map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className={contact.isAvailable ? 'bg-success/10 text-success' : 'bg-muted'}>
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-muted-foreground">{contact.role}</div>
                      <div className="flex items-center space-x-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${contact.isAvailable ? 'bg-success' : 'bg-muted-foreground'}`} />
                        <span>{contact.isAvailable ? 'Available' : 'Unavailable'}</span>
                        <span>• Response: {contact.responseTime}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleEmergencyCall(contact)}
                    className={`${contact.priority === 1 ? 'bg-emergency hover:bg-emergency/90' : 'bg-primary hover:bg-primary/90'}`}
                    disabled={!contact.isAvailable}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </div>
              ))}
          </CardContent>
        </Card>

        {/* Emergency Communication */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Video className="h-5 w-5 text-primary" />
              <span>Emergency Communication</span>
            </CardTitle>
            <CardDescription>
              Direct communication with emergency responders
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeCall ? (
              <div className="space-y-4">
                <div className="bg-emergency-soft border border-emergency/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-emergency rounded-full animate-pulse" />
                      <span className="font-medium">Emergency Call Active</span>
                    </div>
                    <Badge className="bg-emergency text-emergency-foreground">
                      LIVE
                    </Badge>
                  </div>
                  
                  <div className="flex justify-center space-x-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="font-medium">Connected to Emergency Services</div>
                    <div className="text-sm text-muted-foreground">Call duration: 02:34</div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button
                    variant={micEnabled ? "default" : "destructive"}
                    size="lg"
                    onClick={() => setMicEnabled(!micEnabled)}
                  >
                    {micEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                  </Button>
                  <Button
                    variant={videoEnabled ? "default" : "destructive"}
                    size="lg"
                    onClick={() => setVideoEnabled(!videoEnabled)}
                  >
                    {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                  </Button>
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={handleEndCall}
                  >
                    End Call
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center py-8 border-2 border-dashed border-muted-foreground/20 rounded-lg">
                  <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">No active emergency communication</p>
                  <Button onClick={() => handleEmergencyCall(emergencyContacts[0])}>
                    <Phone className="h-4 w-4 mr-2" />
                    Start Emergency Call
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" onClick={handleLocationServices}>
                    <Navigation className="h-4 w-4 mr-2" />
                    Share Location
                  </Button>
                  <Button variant="outline">
                    <Camera className="h-4 w-4 mr-2" />
                    Send Photo
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Alert History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-primary" />
            <span>Recent Alert History</span>
          </CardTitle>
          <CardDescription>
            Previous emergency alerts and their resolution status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${alert.severity === 'high' ? 'bg-destructive/10' : 'bg-warning/10'}`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <div>
                    <div className="font-medium capitalize">{alert.type} Alert</div>
                    <div className="text-sm text-muted-foreground">{alert.description}</div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{alert.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyCenter;