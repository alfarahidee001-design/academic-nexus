import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { LogIn, GraduationCap, Users, ShieldCheck } from 'lucide-react';

const Login: React.FC = () => {
  const { user, login } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/ee92249f-f8b3-4ded-80dd-1b0f213c859f/school-hero-f8932c40-1782693934884.webp" 
          alt="School" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-full text-primary-foreground">
              <GraduationCap size={40} />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">School Portal</CardTitle>
          <CardDescription>Select your role to continue</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button 
            variant="outline" 
            className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-primary/5 border-2"
            onClick={() => login('admin')}
          >
            <ShieldCheck className="text-blue-500" />
            <span>Administrator Access</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-primary/5 border-2"
            onClick={() => login('teacher')}
          >
            <Users className="text-green-500" />
            <span>Teacher Portal</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-primary/5 border-2"
            onClick={() => login('student')}
          >
            <GraduationCap className="text-orange-500" />
            <span>Student Portal</span>
          </Button>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground flex justify-center">
          By continuing, you agree to the portal's terms and conditions.
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
