import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, MapPin, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { loginUser } from '@/services/firebase';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'police' | 'tourism'>('police');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // For demo purposes, accept any email/password combination
      if (email && password) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate login delay
        localStorage.setItem('userRole', role);
        localStorage.setItem('isAuthenticated', 'true');
        
        toast({
          title: "Login successful",
          description: `Welcome to SafeTrip Admin Dashboard`,
        });
        
        navigate('/dashboard');
      } else {
        throw new Error('Please enter both email and password');
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-gradient-primary rounded-full p-4 shadow-glow">
              <Shield className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">SafeTrip Admin</h1>
            <p className="text-muted-foreground mt-2">
              Tourist Safety Monitoring Dashboard
            </p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Access the emergency response dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Department</Label>
                <RadioGroup
                  value={role}
                  onValueChange={(value) => setRole(value as 'police' | 'tourism')}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2 border border-border rounded-lg p-4 hover:border-primary transition-colors">
                    <RadioGroupItem value="police" id="police" />
                    <Label htmlFor="police" className="flex items-center gap-2 cursor-pointer">
                      <Shield className="h-4 w-4 text-primary" />
                      Police
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border border-border rounded-lg p-4 hover:border-primary transition-colors">
                    <RadioGroupItem value="tourism" id="tourism" />
                    <Label htmlFor="tourism" className="flex items-center gap-2 cursor-pointer">
                      <MapPin className="h-4 w-4 text-primary" />
                      Tourism
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Email Input */}
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

              {/* Password Input */}
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

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Demo Instructions */}
            <div className="mt-6 p-4 bg-info/10 border border-info/20 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-info mt-0.5 flex-shrink-0" />
                <div className="text-sm text-info-foreground">
                  <p className="font-medium">Demo Mode</p>
                  <p className="mt-1 opacity-90">
                    Enter any email and password to access the dashboard. Firebase authentication will be integrated in production.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;