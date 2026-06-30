import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Calendar as CalendarIcon, Clock, MapPin, User } from 'lucide-react';

const SchedulePage: React.FC = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const schedule = [
    { time: '08:00 AM - 09:30 AM', subject: 'Physics', room: 'Lab A', teacher: 'Dr. Miller', days: ['Monday', 'Wednesday', 'Friday'] },
    { time: '10:00 AM - 11:30 AM', subject: 'Literature', room: 'Room 102', teacher: 'Prof. Evans', days: ['Monday', 'Tuesday', 'Thursday'] },
    { time: '01:00 PM - 02:30 PM', subject: 'History', room: 'Room 205', teacher: 'Mr. Davis', days: ['Tuesday', 'Wednesday', 'Friday'] },
    { time: '03:00 PM - 04:30 PM', subject: 'Mathematics', room: 'Room 304', teacher: 'Dr. Miller', days: ['Monday', 'Thursday'] },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Class Schedule</h1>
        <p className="text-muted-foreground">Your weekly academic timetable.</p>
      </div>

      <div className="grid gap-6">
        {days.map(day => (
          <Card key={day}>
            <CardHeader className="bg-muted/30 py-3">
              <CardTitle className="text-lg">{day}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {schedule.filter(s => s.days.includes(day)).map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center gap-2 w-48 shrink-0 text-muted-foreground">
                      <Clock size={16} />
                      <span className="text-sm font-medium">{item.time}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold">{item.subject}</h4>
                      <div className="flex flex-wrap gap-4 mt-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin size={14} />
                          <span>{item.room}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <User size={14} />
                          <span>{item.teacher}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {schedule.filter(s => s.days.includes(day)).length === 0 && (
                  <div className="p-8 text-center text-muted-foreground italic text-sm">
                    No classes scheduled for this day.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SchedulePage;
