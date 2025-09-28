import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigate
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, User, Users, Stethoscope } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  onLogin: (user: { email: string; role: 'patient' | 'family' | 'doctor'; name: string }) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [selectedRole, setSelectedRole] = useState<'patient' | 'family' | 'doctor'>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate(); // ✅ Create navigate instance

  const roles = [
    { id: 'patient', label: 'Patient', icon: User, color: 'bg-blue-500' },
    { id: 'family', label: 'Family Member', icon: Users, color: 'bg-green-500' },
    { id: 'doctor', label: 'Healthcare Provider', icon: Stethoscope, color: 'bg-purple-500' }
  ];

  const demoUsers = {
    patient: { email: 'patient@aurocare.com', password: 'demo123', name: 'Eleanor Thompson' },
    family: { email: 'family@aurocare.com', password: 'demo123', name: 'Sarah Thompson' },
    doctor: { email: 'doctor@aurocare.com', password: 'demo123', name: 'Dr. Michael Chen' }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const demoUser = demoUsers[selectedRole];

    if (email === demoUser.email && password === demoUser.password) {
      setTimeout(() => {
        onLogin({
          email,
          role: selectedRole,
          name: demoUser.name
        });
        toast({
          title: "Login Successful",
          description: `Welcome to AuroCare, ${demoUser.name}!`,
        });

        // ✅ Always redirect to patient page
        navigate('/patient');

        setLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Use demo credentials provided.",
          variant: "destructive"
        });
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">AuroCare</span>
          </div>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>
            Choose your role and sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Role Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Login as:</Label>
            <div className="grid grid-cols-1 gap-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id as any)}
                  className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${
                    selectedRole === role.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <role.icon className={`h-5 w-5 ${selectedRole === role.id ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`font-medium ${selectedRole === role.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {role.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="bg-muted/50 p-3 rounded-lg">
            <Label className="text-xs font-medium text-muted-foreground">Demo Credentials:</Label>
            <div className="text-xs mt-1 space-y-1">
              <div>Email: {demoUsers[selectedRole].email}</div>
              <div>Password: {demoUsers[selectedRole].password}</div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
