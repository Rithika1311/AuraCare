import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  User, 
  Users, 
  Stethoscope, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Shield,
  Activity
} from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Patient Dashboard', path: '/patient', icon: User },
    { name: 'Healthcare Portal', path: '/healthcare', icon: Stethoscope },
    { name: 'Family Dashboard', path: '/family', icon: Users },
    { name: 'Emergency Center', path: '/emergency', icon: Shield },
    { name: 'Health Monitoring', path: '/monitoring', icon: Activity },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">CarePlus</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant={isActive(item.path) ? "default" : "ghost"}
                asChild
                className="flex items-center space-x-2"
              >
                <Link to={item.path}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </Button>
            ))}
            
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-border">
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/')}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant={isActive(item.path) ? "default" : "ghost"}
                  asChild
                  className="justify-start"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to={item.path} className="flex items-center space-x-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </Button>
              ))}
              
              <div className="pt-2 border-t border-border">
                <Button variant="ghost" className="justify-start w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start w-full"
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/');
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;