import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { schoolService } from '../lib/school-service';
import { useAuth } from '../contexts/AuthContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';

const GradesPage: React.FC = () => {
  const { user } = useAuth();
  const grades = schoolService.getGrades(user?.id || '');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Academic Record</h1>
        <p className="text-muted-foreground">Detailed overview of your current grades and history.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Semester Grades</CardTitle>
          <CardDescription>Academic year 2023-2024</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades.map((grade: any, idx: number) => {
                const percentage = (grade.score / grade.total) * 100;
                let letterGrade = 'F';
                if (percentage >= 90) letterGrade = 'A';
                else if (percentage >= 80) letterGrade = 'B';
                else if (percentage >= 70) letterGrade = 'C';
                else if (percentage >= 60) letterGrade = 'D';

                return (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{grade.subject}</TableCell>
                    <TableCell>{grade.score}</TableCell>
                    <TableCell>{grade.total}</TableCell>
                    <TableCell>
                      <Badge variant={letterGrade === 'A' || letterGrade === 'B' ? 'default' : 'secondary'}>
                        {letterGrade}
                      </Badge>
                    </TableCell>
                    <TableCell>{grade.date}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default GradesPage;
