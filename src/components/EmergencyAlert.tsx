import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Phone, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  User,
  Users
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  priority: number;
}

interface EmergencyAlertProps {
  patientName?: string;
  location?: string;
  timestamp?: string;
  alertType?: 'medical' | 'fall' | 'medication' | 'panic';
  isActive?: boolean;
}

const EmergencyAlert = ({
  patientName = "Eleanor Thompson",
  location = "Living Room - 123 Oak Street",
  timestamp = new Date().toLocaleString(),
  alertType = 'fall',
  isActive = true
}: EmergencyAlertProps) => {
  const [isResponding, setIsResponding] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const { toast } = useToast();

  const emergencyContacts: EmergencyContact[] = [
    { name: "Dr. Sarah Wilson", relationship: "Primary Care", phone: "+1 (555) 123-4567", priority: 1 },
    { name: "Michael Thompson", relationship: "Son", phone: "+1 (555) 234-5678", priority: 2 },
    { name: "Emergency Services", relationship: "911", phone: "911", priority: 3 },
  ];

  const getAlertConfig = () => {
    switch (alertType) {
      case 'medical':
        return {
          title: 'Medical Emergency Detected',
          description: 'Abnormal vital signs detected',
          icon: AlertTriangle,
          color: 'emergency'
        };
      case 'fall':
        return {
          title: 'Fall Detection Alert',
          description: 'Sudden impact detected, no movement for 30 seconds',
          icon: AlertTriangle,
          color: 'emergency'
        };
      case 'medication':
        return {
          title: 'Medication Alert',
          description: 'Critical medication missed',
          icon: AlertTriangle,
          color: 'warning'
        };
      case 'panic':
        return {
          title: 'Panic Button Activated',
          description: 'Manual emergency alert triggered',
          icon: Shield,
          color: 'emergency'
        };
      default:
        return {
          title: 'Emergency Alert',
          description: 'Emergency situation detected',
          icon: AlertTriangle,
          color: 'emergency'
        };
    }
  };

  const alertConfig = getAlertConfig();

  const handleRespond = () => {
    setIsResponding(true);
    toast({
      title: "Response Initiated",
      description: "Emergency contacts have been notified.",
    });
  };

  const handleResolve = () => {
    setIsResolved(true);
    toast({
      title: "Alert Resolved",
      description: "Emergency situation has been resolved.",
    });
  };

  const callContact = (phone: string, name: string) => {
    toast({
      title: "Calling Contact",
      description: `Initiating call to ${name} at ${phone}`,
    });
  };

  if (!isActive && !isResolved) return null;

  return (
    <div className="space-y-4">
      <Alert className={`border-2 ${isResolved ? 'border-success' : 'border-emergency'} ${isResolved ? 'bg-success-soft' : 'bg-emergency-soft'}`}>
        <div className="flex items-center space-x-2">
          {isResolved ? (
            <CheckCircle className="h-5 w-5 text-success" />
          ) : (
            <alertConfig.icon className="h-5 w-5 text-emergency animate-pulse" />
          )}
          <AlertTitle className={isResolved ? 'text-success' : 'text-emergency'}>
            {isResolved ? 'Alert Resolved' : alertConfig.title}
          </AlertTitle>
        </div>
        <AlertDescription className="mt-2">
          <div className="space-y-2">
            <p>{alertConfig.description}</p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{patientName}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{timestamp}</span>
              </div>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {!isResolved && (
        <Card className="border-emergency/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Emergency Response</span>
            </CardTitle>
            <CardDescription>
              Immediate action required - Contact emergency responders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isResponding ? (
              <div className="flex space-x-2">
                <Button 
                  onClick={handleRespond} 
                  className="flex-1 bg-emergency hover:bg-emergency/90"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Activate Emergency Response
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleResolve}
                  className="border-success text-success hover:bg-success hover:text-success-foreground"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Resolved
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Emergency Contacts</span>
                  <Badge variant="destructive">Active Response</Badge>
                </div>
                
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {contact.relationship} • {contact.phone}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => callContact(contact.phone, contact.name)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                  </div>
                ))}
                
                <Button 
                  onClick={handleResolve} 
                  className="w-full bg-success hover:bg-success/90"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm Situation Resolved
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmergencyAlert;