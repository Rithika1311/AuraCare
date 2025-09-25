import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import HealthCard from '@/components/HealthCard';
import { 
  Users, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Heart, 
  Pill, 
  Phone, 
  FileText, 
  TrendingUp,
  Calendar,
  MessageSquare,
  Video,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  status: 'stable' | 'attention' | 'critical';
  lastCheckIn: string;
  vitals: {
    heartRate: string;
    bloodPressure: string;
    temperature: string;
    bloodSugar: string;
  };
  medications: number;
  compliance: number;
  emergencyContacts: string[];
}

const HealthcareDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const { toast } = useToast();

  const patients: Patient[] = [
    {
      id: '1',
      name: 'Eleanor Thompson',
      age: 78,
      condition: 'Diabetes Type 2, Hypertension',
      status: 'attention',
      lastCheckIn: '2 hours ago',
      vitals: {
        heartRate: '72 bpm',
        bloodPressure: '120/80',
        temperature: '98.6°F',
        bloodSugar: '140 mg/dL'
      },
      medications: 4,
      compliance: 85,
      emergencyContacts: ['Michael Thompson (Son)', 'Sarah Thompson (Daughter)']
    },
    {
      id: '2',
      name: 'Robert Chen',
      age: 82,
      condition: 'Heart Disease, Arthritis',
      status: 'stable',
      lastCheckIn: '30 minutes ago',
      vitals: {
        heartRate: '68 bpm',
        bloodPressure: '118/75',
        temperature: '98.4°F',
        bloodSugar: '95 mg/dL'
      },
      medications: 6,
      compliance: 92,
      emergencyContacts: ['Linda Chen (Wife)', 'David Chen (Son)']
    },
    {
      id: '3',
      name: 'Maria Rodriguez',
      age: 75,
      condition: 'COPD, Osteoporosis',
      status: 'critical',
      lastCheckIn: '15 minutes ago',
      vitals: {
        heartRate: '88 bpm',
        bloodPressure: '145/95',
        temperature: '99.2°F',
        bloodSugar: '110 mg/dL'
      },
      medications: 5,
      compliance: 78,
      emergencyContacts: ['Carlos Rodriguez (Husband)', 'Emergency Services']
    }
  ];

  const overviewStats = [
    { title: 'Total Patients', value: '24', icon: Users, variant: 'default' as const, trend: 'up' as const, trendValue: '+2 this month' },
    { title: 'Critical Alerts', value: '3', icon: AlertTriangle, variant: 'emergency' as const, trend: 'down' as const, trendValue: '-2 from yesterday' },
    { title: 'Avg Compliance', value: '87%', icon: CheckCircle, variant: 'success' as const, trend: 'up' as const, trendValue: '+3% this week' },
    { title: 'Pending Reviews', value: '8', icon: FileText, variant: 'warning' as const, trend: 'stable' as const, trendValue: 'Requires attention' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'bg-success text-success-foreground';
      case 'attention': return 'bg-warning text-warning-foreground';
      case 'critical': return 'bg-emergency text-emergency-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handlePatientAction = (patientId: string, action: string) => {
    toast({
      title: `${action} Initiated`,
      description: `Action for patient ${patients.find(p => p.id === patientId)?.name} has been started.`,
    });
  };

  const selectedPatientData = patients.find(p => p.id === selectedPatient);

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Healthcare Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor and manage patient care</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <HealthCard key={index} {...stat} />
        ))}
      </div>

      <Tabs defaultValue="patients" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-fit">
          <TabsTrigger value="patients">Patient List</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="patients" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Patient List */}
            <Card>
              <CardHeader>
                <CardTitle>Patient Overview</CardTitle>
                <CardDescription>
                  Click on a patient to view detailed information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {patients.map((patient) => (
                  <div 
                    key={patient.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-accent/50 ${
                      selectedPatient === patient.id ? 'border-primary bg-primary-soft' : ''
                    }`}
                    onClick={() => setSelectedPatient(patient.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{patient.name}</div>
                          <div className="text-sm text-muted-foreground">Age {patient.age}</div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(patient.status)}>
                        {patient.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-2">
                      {patient.condition}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Last check: {patient.lastCheckIn}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Activity className="h-3 w-3" />
                        <span>{patient.compliance}% compliant</span>
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Patient Details */}
            {selectedPatientData ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarFallback>{selectedPatientData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div>{selectedPatientData.name}</div>
                      <div className="text-sm font-normal text-muted-foreground">
                        Patient Details & Actions
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Vital Signs */}
                  <div>
                    <h4 className="font-medium mb-3">Current Vital Signs</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Heart className="h-4 w-4 text-primary" />
                          <span className="text-sm">Heart Rate</span>
                        </div>
                        <div className="font-medium mt-1">{selectedPatientData.vitals.heartRate}</div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Activity className="h-4 w-4 text-primary" />
                          <span className="text-sm">Blood Pressure</span>
                        </div>
                        <div className="font-medium mt-1">{selectedPatientData.vitals.bloodPressure}</div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <span className="text-sm">Temperature</span>
                        </div>
                        <div className="font-medium mt-1">{selectedPatientData.vitals.temperature}</div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Pill className="h-4 w-4 text-primary" />
                          <span className="text-sm">Blood Sugar</span>
                        </div>
                        <div className="font-medium mt-1">{selectedPatientData.vitals.bloodSugar}</div>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contacts */}
                  <div>
                    <h4 className="font-medium mb-3">Emergency Contacts</h4>
                    <div className="space-y-2">
                      {selectedPatientData.emergencyContacts.map((contact, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">{contact}</span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handlePatientAction(selectedPatientData.id, 'Call Contact')}
                          >
                            <Phone className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handlePatientAction(selectedPatientData.id, 'Video Call')}
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Video Call
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handlePatientAction(selectedPatientData.id, 'Send Message')}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handlePatientAction(selectedPatientData.id, 'Update Care Plan')}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Care Plan
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handlePatientAction(selectedPatientData.id, 'Emergency Alert')}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Emergency
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-96">
                  <div className="text-center text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4" />
                    <p>Select a patient to view details</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Active Alerts</CardTitle>
              <CardDescription>
                Monitor critical patient alerts and emergency situations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-12">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
                <p>No active alerts at this time</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Patient Analytics</CardTitle>
              <CardDescription>
                View trends and insights across your patient population
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-12">
                <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                <p>Analytics dashboard coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Medical Reports</CardTitle>
              <CardDescription>
                Generate and manage patient care reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-12">
                <FileText className="h-12 w-12 mx-auto mb-4" />
                <p>Reports section coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthcareDashboard;