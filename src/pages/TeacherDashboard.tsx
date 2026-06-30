import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { BookOpen, Users, Clock, CheckCircle2, MoreVertical } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { schoolService } from '../lib/school-service';

const TeacherDashboard: React.FC = () => {
  const classes = [
    { name: 'Physics 101', students: 28, room: 'Lab A', time: '08:00 AM', progress: 75, id: 'physics-101' },
    { name: 'Calculus II', students: 22, room: 'Room 302', time: '10:30 AM', progress: 60 },
    { name: 'Applied Math', students: 30, room: 'Room 304', time: '01:00 PM', progress: 85 },
  ];

  const handleAttendance = () => {
    toast.success('Attendance for Physics 101 has been submitted successfully.');
  };

  const handleGrade = (studentName: string) => {
    const grade = {
      subject: 'Physics',
      score: 95,
      total: 100,
      date: new Date().toISOString().split('T')[0]
    };
    
    // Simulate updating Alex Rivera's grade
    if (studentName === 'Alex Rivera') {
      schoolService.updateGrade('student-1', grade);
      toast.success(`Grade for ${studentName} updated: 95/100`);
    } else {
      toast.info(`Grading interface for ${studentName} opened.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Hello Dr. Miller. You have 3 classes today.</p>
        </div>
        <Button onClick={handleAttendance}>Quick Attendance</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {classes.map((cls) => (
          <Card key={cls.name} className="overflow-hidden">
            <div className="h-2 bg-primary" style={{ width: `${cls.progress}%` }}></div>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>{cls.name}</CardTitle>
                <CardDescription>{cls.room} • {cls.time}</CardDescription>
              </div>
              <Button variant="ghost" size="icon"><MoreVertical size={20} /></Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm mb-4">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-muted-foreground" />
                  <span>{cls.students} Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-muted-foreground" />
                  <span>50 mins left</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" variant="outline" size="sm">Roster</Button>
                <Button 
                  className="flex-1" 
                  size="sm" 
                  onClick={() => toast.info(`Gradebook for ${cls.name} is ready.`)}>
                  Grades
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>Tasks requiring grading</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { student: 'Alex Rivera', task: 'Physics Lab Report', time: '2 hours ago' },
              { student: 'Emma Watson', task: 'Math Quiz 3', time: '4 hours ago' },
              { student: 'Leo Messi', task: 'History Essay', time: 'Yesterday' },
            ].map((sub, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-bold text-xs">
                    {sub.student.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{sub.task}</p>
                    <p className="text-xs text-muted-foreground">{sub.student} • {sub.time}</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => handleGrade(sub.student)}
                >Grade</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>Daily participation trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">92%</p>
                  <p className="text-[10px] text-muted-foreground uppercase">Average</p>
                </div>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden flex">
                  <div className="h-full bg-green-500" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span>Physics 101</span>
                  </div>
                  <span className="font-semibold">27/28</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span>Calculus II</span>
                  </div>
                  <span className="font-semibold">20/22</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
