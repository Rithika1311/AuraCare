import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Plus, 
  Calendar, 
  User, 
  Clock,
  Heart,
  Activity,
  Pill,
  Users,
  Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Note {
  id: string;
  date: string;
  time: string;
  author: string;
  authorRole: 'family' | 'doctor' | 'nurse' | 'patient';
  category: 'general' | 'medical' | 'medication' | 'social' | 'emergency';
  content: string;
  priority: 'low' | 'medium' | 'high';
}

const PatientNotes = ({ patientName = "Eleanor Thompson", userRole = "family" }: { 
  patientName?: string; 
  userRole?: 'family' | 'doctor' | 'nurse';
}) => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      date: '2024-09-25',
      time: '09:30 AM',
      author: 'Dr. Michael Chen',
      authorRole: 'doctor',
      category: 'medical',
      content: 'Patient is responding well to new medication. Blood pressure has stabilized. Recommend continuing current dosage for another 2 weeks.',
      priority: 'medium'
    },
    {
      id: '2',
      date: '2024-09-25',
      time: '08:15 AM',
      author: 'Sarah Thompson',
      authorRole: 'family',
      category: 'general',
      content: 'Mom had a good night. Slept through the night without issues. Had breakfast at 8 AM - oatmeal and berries. Seems in good spirits today.',
      priority: 'low'
    }
  ]);

  const [newNote, setNewNote] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Note['category']>('general');
  const [selectedPriority, setSelectedPriority] = useState<Note['priority']>('low');
  const { toast } = useToast();

  const addNote = () => {
    if (!newNote.trim()) return;

    const now = new Date();
    const note: Note = {
      id: Date.now().toString(),
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      author: userRole === 'family' ? 'Sarah Thompson' : userRole === 'doctor' ? 'Dr. Michael Chen' : 'Nurse Johnson',
      authorRole: userRole,
      category: selectedCategory,
      content: newNote,
      priority: selectedPriority
    };

    setNotes(prev => [note, ...prev]);
    setNewNote('');
    toast({
      title: "Note Added",
      description: "Your note has been saved to the patient record.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="h-5 w-5 text-primary" />
          <span>Patient Notes for {patientName}</span>
        </CardTitle>
        <CardDescription>
          Record daily observations and important information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="Enter your note here..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            rows={4}
          />
        </div>
        <Button onClick={addNote} disabled={!newNote.trim()}>
          <Save className="h-4 w-4 mr-2" />
          Add Note
        </Button>
        
        <Separator />
        
        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline">
                  <User className="h-3 w-3 mr-1" />
                  {note.author}
                </Badge>
                <div className="text-xs text-muted-foreground">
                  {note.date} at {note.time}
                </div>
              </div>
              <p className="text-sm">{note.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientNotes;