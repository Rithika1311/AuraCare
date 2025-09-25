import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import HealthCard from '@/components/HealthCard';
import EmergencyAlert from '@/components/EmergencyAlert';
import { 
  Heart, 
  Activity, 
  Thermometer, 
  Droplets, 
  Clock, 
  Pill, 
  Calendar, 
  Users, 
  Brain, 
  Shield,
  CheckCircle,
  AlertCircle,
  Plus,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PatientDashboard = () => {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const { toast } = useToast();

  const vitalSigns = [
    { title: 'Heart Rate', value: '72 bpm', icon: Heart, variant: 'success' as const, trend: 'stable' as const, trendValue: 'Normal range' },
    { title: 'Blood Pressure', value: '120/80', icon: Activity, variant: 'success' as const, trend: 'stable' as const, trendValue: 'Optimal' },
    { title: 'Temperature', value: '98.6°F', icon: Thermometer, variant: 'default' as const, trend: 'stable' as const, trendValue: 'Normal' },
    { title: 'Blood Sugar', value: '95 mg/dL', icon: Droplets, variant: 'success' as const, trend: 'down' as const, trendValue: '↓ 5% from yesterday' },
  ];

  const todaysMedications = [
    { name: 'Metformin', time: '8:00 AM', taken: true, dosage: '500mg' },
    { name: 'Lisinopril', time: '8:00 AM', taken: true, dosage: '10mg' },
    { name: 'Aspirin', time: '12:00 PM', taken: false, dosage: '81mg', overdue: true },
    { name: 'Metformin', time: '6:00 PM', taken: false, dosage: '500mg' },
  ];

  const cognitiveActivities = [
    { name: 'Daily Crossword', completed: true, points: 150 },
    { name: 'Memory Game', completed: false, points: 0 },
    { name: 'Word Association', completed: true, points: 100 },
  ];

  const socialConnections = [
    { name: 'Video call with Sarah', time: '2:00 PM', type: 'scheduled' },
    { name: 'Book club meeting', time: '4:00 PM', type: 'group' },
    { name: 'Message from Michael', time: '10 minutes ago', type: 'message' },
  ];

  const handleMedicationTaken = (index: number) => {
    toast({
      title: "Medication Recorded",
      description: `${todaysMedications[index].name} marked as taken.`,
    });
  };

  const handleEmergencyActivation = () => {
    setEmergencyActive(true);
    toast({
      title: "Emergency Alert Activated",
      description: "Emergency contacts are being notified.",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Emergency Alert Section */}
      {emergencyActive && (
        <EmergencyAlert 
          patientName="Eleanor Thompson"
          alertType="panic"
          isActive={emergencyActive}
        />
      )}

      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Good Morning, Eleanor</h1>
          <p className="text-muted-foreground mt-1">How are you feeling today?</p>
        </div>
        <Button 
          onClick={handleEmergencyActivation}
          className="bg-emergency hover:bg-emergency/90 text-emergency-foreground"
          size="lg"
        >
          <Shield className="h-5 w-5 mr-2" />
          Emergency Help
        </Button>
      </div>

      {/* Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {vitalSigns.map((vital, index) => (
          <HealthCard key={index} {...vital} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Medications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Pill className="h-5 w-5 text-primary" />
              <span>Today's Medications</span>
            </CardTitle>
            <CardDescription>
              Stay on track with your medication schedule
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {todaysMedications.map((med, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {med.taken ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : (
                    <AlertCircle className={`h-5 w-5 ${med.overdue ? 'text-emergency' : 'text-muted-foreground'}`} />
                  )}
                  <div>
                    <div className="font-medium">{med.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {med.dosage} • {med.time}
                      {med.overdue && <Badge variant="destructive" className="ml-2">Overdue</Badge>}
                    </div>
                  </div>
                </div>
                {!med.taken && (
                  <Button 
                    size="sm" 
                    onClick={() => handleMedicationTaken(index)}
                    variant={med.overdue ? "destructive" : "default"}
                  >
                    Mark Taken
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Cognitive Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-primary" />
              <span>Brain Training</span>
            </CardTitle>
            <CardDescription>
              Keep your mind sharp with daily exercises
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Daily Progress</span>
              <span className="text-sm font-medium">2/3 completed</span>
            </div>
            <Progress value={67} className="h-2" />
            
            <div className="space-y-3">
              {cognitiveActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {activity.completed ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                    )}
                    <span className={activity.completed ? 'line-through text-muted-foreground' : ''}>
                      {activity.name}
                    </span>
                  </div>
                  <Badge variant={activity.completed ? "default" : "secondary"}>
                    {activity.points} pts
                  </Badge>
                </div>
              ))}
            </div>
            
            <Button className="w-full" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Start Next Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Social Connections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Social Connections</span>
          </CardTitle>
          <CardDescription>
            Stay connected with family and friends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {socialConnections.map((connection, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="flex-shrink-0">
                  {connection.type === 'message' ? (
                    <MessageSquare className="h-5 w-5 text-primary" />
                  ) : connection.type === 'scheduled' ? (
                    <Calendar className="h-5 w-5 text-success" />
                  ) : (
                    <Users className="h-5 w-5 text-warning" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{connection.name}</div>
                  <div className="text-xs text-muted-foreground">{connection.time}</div>
                </div>
              </div>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Message
            </Button>
            <Button variant="outline" className="flex-1">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Call
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDashboard;