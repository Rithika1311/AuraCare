import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Phone, MapPin, Clock, Users, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SOSButtonProps {
  patientName?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'button' | 'floating';
}

const SOSButton = ({ 
  patientName = "Eleanor Thompson", 
  size = 'lg',
  variant = 'button' 
}: SOSButtonProps) => {
  const [isActivated, setIsActivated] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();

  const emergencyContacts = [
    { name: 'Emergency Services', number: '911', status: 'calling' },
    { name: 'Sarah Thompson (Daughter)', number: '+1-555-0123', status: 'notified' },
    { name: 'Dr. Michael Chen', number: '+1-555-0456', status: 'notified' },
    { name: 'AuroCare Emergency', number: '+1-555-AURO', status: 'responding' }
  ];

  const handleSOSActivation = () => {
    setIsActivated(true);
    setCountdown(30);

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    toast({
      title: "🚨 EMERGENCY ALERT ACTIVATED",
      description: "Emergency services and contacts are being notified immediately.",
      variant: "destructive"
    });

    // Simulate emergency response
    setTimeout(() => {
      toast({
        title: "📞 Emergency Services Called",
        description: "Emergency responders have been dispatched to your location.",
        variant: "destructive"
      });
    }, 3000);

    setTimeout(() => {
      toast({
        title: "👨‍⚕️ Medical Team Notified",
        description: "Your healthcare provider has been alerted.",
      });
    }, 5000);
  };

  const handleCancel = () => {
    setIsActivated(false);
    setCountdown(0);
    toast({
      title: "Emergency Alert Cancelled",
      description: "Emergency response has been cancelled.",
    });
  };

  if (variant === 'floating' && !isActivated) {
    return (
      <Button
        onClick={handleSOSActivation}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-emergency hover:bg-emergency/90 text-emergency-foreground shadow-lg z-50 animate-pulse"
        size="lg"
      >
        <Shield className="h-8 w-8" />
      </Button>
    );
  }

  const buttonSizes = {
    sm: 'h-12 w-12 rounded-full',
    md: 'h-16 w-16 rounded-full', 
    lg: 'h-20 w-20 rounded-full'
  };

  const iconSizes = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  if (!isActivated) {
    return (
      <Button
        onClick={handleSOSActivation}
        className={`${buttonSizes[size]} bg-emergency hover:bg-emergency/90 text-emergency-foreground animate-pulse shadow-lg relative`}
      >
        <Shield className={iconSizes[size]} />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          SOS
        </span>
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-md mx-4 border-emergency">
        <CardContent className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="h-16 w-16 bg-emergency rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Shield className="h-8 w-8 text-emergency-foreground" />
            </div>
            <h2 className="text-xl font-bold text-emergency">EMERGENCY ACTIVATED</h2>
            <p className="text-muted-foreground">
              Emergency response initiated for {patientName}
            </p>
            {countdown > 0 && (
              <Badge variant="destructive" className="mt-2">
                <Clock className="h-3 w-3 mr-1" />
                Response in {countdown}s
              </Badge>
            )}
          </div>

          {/* Location Info */}
          <div className="bg-muted/50 p-3 rounded-lg mb-4">
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Location: 123 Elder Care Lane, Springfield</span>
            </div>
            <div className="flex items-center space-x-2 text-sm mt-1">
              <Clock className="h-4 w-4 text-primary" />
              <span>Time: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>

          {/* Emergency Contacts Status */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center space-x-2 text-sm font-medium">
              <Users className="h-4 w-4" />
              <span>Emergency Contacts:</span>
            </div>
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between text-sm p-2 bg-muted/30 rounded">
                <div>
                  <div className="font-medium">{contact.name}</div>
                  <div className="text-muted-foreground">{contact.number}</div>
                </div>
                <Badge 
                  variant={
                    contact.status === 'calling' ? 'destructive' :
                    contact.status === 'responding' ? 'default' : 'secondary'
                  }
                >
                  {contact.status}
                </Badge>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button className="w-full" disabled>
              <Phone className="h-4 w-4 mr-2" />
              Emergency Services Called
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleCancel}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel Emergency
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-center text-xs text-muted-foreground mt-4">
            Emergency services have your medical information and location.
            Stay calm, help is on the way.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SOSButton;