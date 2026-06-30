import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { BookOpen, Calendar, Award, Clock, ArrowUpRight } from 'lucide-react';
import { schoolService } from '../lib/school-service';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const grades = schoolService.getGrades(user?.id || '');
  const announcements = schoolService.getAnnouncements();

  const schedule = [
    { time: '08:00 AM', subject: 'Physics', room: 'Lab A', teacher: 'Dr. Miller' },
    { time: '10:00 AM', subject: 'Literature', room: 'Room 102', teacher: 'Prof. Evans' },
    { time: '01:00 PM', subject: 'History', room: 'Room 205', teacher: 'Mr. Davis' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}. You have 3 classes today.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">View Grades</Button>
          <Button size="sm">Homework</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your classes for March 15, 2024</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {schedule.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 border rounded-xl bg-card hover:bg-muted/30 transition-colors">
                <div className="flex flex-col items-center justify-center w-20 py-1 bg-muted rounded-lg border">
                  <span className="text-xs font-bold text-primary">{item.time.split(' ')[1]}</span>
                  <span className="text-lg font-black">{item.time.split(' ')[0]}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{item.subject}</h4>
                  <p className="text-sm text-muted-foreground">{item.teacher} • {item.room}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <ArrowUpRight size={20} />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Academic Progress</CardTitle>
            <CardDescription>Recent grades and performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative h-32 w-32 flex items-center justify-center">
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle className="text-muted stroke-current" strokeWidth="8" fill="transparent" r="40" cx="50" cy="50" />
                  <circle className="text-primary stroke-current" strokeWidth="8" strokeLinecap="round" fill="transparent" r="40" cx="50" cy="50" strokeDasharray="251.2" strokeDashoffset="25.12" />
                </svg>
                <div className="absolute text-center">
                  <p className="text-3xl font-bold">A-</p>
                  <p className="text-[10px] text-muted-foreground uppercase">GPA 3.8</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {grades.map((grade: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-orange-500" />
                    <span>{grade.subject}</span>
                  </div>
                  <span className="font-bold">{grade.score}/{grade.total}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Announcements</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {announcements.map((item: any) => (
            <div key={item.id} className="p-4 border rounded-lg space-y-2">
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm text-muted-foreground line-clamp-2">{item.content}</p>
              <div className="text-[10px] text-muted-foreground uppercase flex gap-2">
                <span>{item.author}</span>
                <span>•</span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
