import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Shield, 
  Users, 
  Activity, 
  Brain, 
  Phone, 
  Stethoscope, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';
import heroImage from '@/assets/hero-elderly-care.jpg';

const Index = () => {
  const features = [
    {
      icon: Activity,
      title: 'Health Monitoring',
      description: 'Real-time vital signs tracking with smart sensors and wearable devices for continuous health oversight.'
    },
    {
      icon: Shield,
      title: 'Emergency Response',
      description: 'Instant alert system with automated emergency protocols and rapid response coordination.'
    },
    {
      icon: Brain,
      title: 'Cognitive Support',
      description: 'Personalized brain training activities and cognitive stimulation to maintain mental sharpness.'
    },
    {
      icon: Users,
      title: 'Family Coordination',
      description: 'Connect family members and caregivers with real-time updates and communication tools.'
    },
    {
      icon: Phone,
      title: 'Healthcare Integration',
      description: 'Seamless connection with healthcare providers for coordinated care management.'
    },
    {
      icon: Heart,
      title: 'Medication Management',
      description: 'Smart medication reminders and adherence tracking to ensure proper treatment compliance.'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Wilson',
      role: 'Geriatrician',
      content: 'CarePlus has revolutionized how we monitor our elderly patients. The real-time data helps us provide proactive care.',
      rating: 5
    },
    {
      name: 'Michael Thompson',
      role: 'Family Caregiver',
      content: 'Peace of mind knowing my mother is safe and I can stay connected with her care team at all times.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-sm bg-background/95 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">CarePlus</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="#features">Features</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="#about">About</Link>
              </Button>
              <Button asChild>
                <Link to="/patient">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-soft to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary text-primary-foreground">
                  Next-Generation Elderly Care
                </Badge>
                <h1 className="text-5xl font-bold text-foreground leading-tight">
                  Smart Healthcare for
                  <span className="text-primary"> Dignified Aging</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Comprehensive AI-powered platform that monitors health patterns, coordinates care, 
                  manages emergencies, and ensures quality of life while maintaining independence.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link to="/patient">
                    Patient Portal
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                  <Link to="/healthcare">
                    Healthcare Portal
                    <Stethoscope className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Monitoring</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Families Served</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Elderly care technology and monitoring"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-8 w-8 text-success" />
                  <div>
                    <div className="font-medium">Emergency Alert System</div>
                    <div className="text-sm text-muted-foreground">Instant response activated</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Comprehensive Care Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform integrates cutting-edge technology with compassionate care to support 
              elderly individuals and their families with dignity and independence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-0 bg-card">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Portals Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Tailored Experiences for Every User
            </h2>
            <p className="text-xl text-muted-foreground">
              Different interfaces designed for patients, healthcare providers, and family members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-200 border-2 hover:border-primary/20">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Patient Portal</CardTitle>
                <CardDescription>
                  Intuitive interface for elderly individuals to manage their health
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <ul className="text-left space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Daily health monitoring</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Medication reminders</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Cognitive activities</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Family connections</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link to="/patient">Access Patient Portal</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-200 border-2 hover:border-primary/20">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Stethoscope className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Healthcare Portal</CardTitle>
                <CardDescription>
                  Professional dashboard for healthcare providers and caregivers
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <ul className="text-left space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Patient monitoring</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Care plan management</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Emergency alerts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Analytics & reports</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link to="/healthcare">Access Healthcare Portal</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-200 border-2 hover:border-primary/20">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Family Portal</CardTitle>
                <CardDescription>
                  Stay connected and coordinated with your loved one's care
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <ul className="text-left space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Real-time updates</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Communication tools</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Care coordination</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Emergency notifications</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link to="/family">Access Family Portal</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Trusted by Healthcare Professionals
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 bg-card">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                    ))}
                  </div>
                  <blockquote className="text-lg italic mb-4">
                    "{testimonial.content}"
                  </blockquote>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">CarePlus</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Empowering dignified aging through intelligent healthcare technology
            </p>
            <div className="flex items-center justify-center space-x-6">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm">24/7 Support Available</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
