import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Clock, Utensils, Coffee, Pill, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Reminder {
  id: string;
  type: 'meal' | 'medication' | 'exercise' | 'checkup';
  title: string;
  message: string;
  time: string;
  icon: any;
}

const LunchReminder = () => {
  const [activeReminders, setActiveReminders] = useState<Reminder[]>([]);
  const [lastReminderTime, setLastReminderTime] = useState<number>(0);
  const { toast } = useToast();

  const reminders: Reminder[] = [
    {
      id: 'lunch',
      type: 'meal',
      title: 'Lunch Time!',
      message: 'Have you had your lunch today? It\'s important to maintain regular meal times.',
      time: '12:00 PM',
      icon: Utensils
    },
    {
      id: 'medication',
      type: 'medication',
      title: 'Medication Reminder',
      message: 'Time for your afternoon medication. Please take it with water.',
      time: '2:00 PM',
      icon: Pill
    },
    {
      id: 'water',
      type: 'checkup',
      title: 'Stay Hydrated',
      message: 'Remember to drink water regularly. Have you had enough water today?',
      time: '3:00 PM',
      icon: Coffee
    },
    {
      id: 'exercise',
      type: 'exercise',
      title: 'Light Exercise',
      message: 'Time for some light stretching or a short walk. Keep your body active!',
      time: '4:00 PM',
      icon: Heart
    }
  ];

  // Check for reminders every minute
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTime = currentHour * 60 + currentMinute; // Convert to minutes
      
      // Only show reminder once per hour
      if (currentTime - lastReminderTime >= 60) {
        let reminderToShow: Reminder | null = null;

        // Check for specific times
        if (currentHour === 12 && currentMinute === 0) {
          reminderToShow = reminders.find(r => r.id === 'lunch') || null;
        } else if (currentHour === 14 && currentMinute === 0) {
          reminderToShow = reminders.find(r => r.id === 'medication') || null;
        } else if (currentHour === 15 && currentMinute === 0) {
          reminderToShow = reminders.find(r => r.id === 'water') || null;
        } else if (currentHour === 16 && currentMinute === 0) {
          reminderToShow = reminders.find(r => r.id === 'exercise') || null;
        }
        // For demo purposes, show a reminder every 30 seconds
        else if (now.getSeconds() % 30 === 0 && currentTime - lastReminderTime >= 0.5) {
          reminderToShow = reminders[Math.floor(Math.random() * reminders.length)];
        }

        if (reminderToShow && !activeReminders.find(r => r.id === reminderToShow!.id)) {
          setActiveReminders(prev => [...prev, reminderToShow!]);
          setLastReminderTime(currentTime);
          
          toast({
            title: reminderToShow.title,
            description: reminderToShow.message,
          });
        }
      }
    };

    const interval = setInterval(checkReminders, 1000);
    return () => clearInterval(interval);
  }, [lastReminderTime, activeReminders, toast]);

  const handleReminderResponse = (reminderId: string, completed: boolean) => {
    setActiveReminders(prev => prev.filter(r => r.id !== reminderId));
    
    const reminder = reminders.find(r => r.id === reminderId);
    if (reminder) {
        toast({
          title: completed ? "Great job!" : "Reminder dismissed",
          description: completed 
            ? `Thank you for completing: ${reminder.title}` 
            : `Reminder for ${reminder.title} dismissed`,
        });
    }
  };

  const dismissReminder = (reminderId: string) => {
    setActiveReminders(prev => prev.filter(r => r.id !== reminderId));
  };

  if (activeReminders.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm animate-slide-in-right">
      {activeReminders.map((reminder) => (
        <Card key={reminder.id} className="border-primary/20 bg-card/95 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <reminder.icon className="h-5 w-5 text-primary" />
                <Badge variant={reminder.type === 'meal' ? 'default' : 'secondary'}>
                  <Clock className="h-3 w-3 mr-1" />
                  {reminder.time}
                </Badge>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => dismissReminder(reminder.id)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <h4 className="font-semibold text-foreground mb-1">
              {reminder.title}
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              {reminder.message}
            </p>
            
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={() => handleReminderResponse(reminder.id, true)}
                className="flex-1"
              >
                ✓ Done
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleReminderResponse(reminder.id, false)}
                className="flex-1"
              >
                Later
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LunchReminder;