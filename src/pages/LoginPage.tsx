
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrainFront, Key, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Required Fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Store username and password in session storage for OTP verification
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("password", password);
      
      // Navigate to OTP verification page
      navigate("/verify-otp");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ir-dark to-gray-900 flex flex-col py-10 px-4">
      {/* Header with logo */}
      <div className="container mx-auto mb-8">
        <div className="flex items-center justify-center gap-3">
          <TrainFront className="h-8 w-8 text-ir-blue" />
          <h1 className="text-3xl font-bold text-white">Healthy Train</h1>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md bg-gray-800 border-gray-700 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white">Official Login</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center px-3 py-2 rounded-md bg-gray-900 border border-gray-700">
                  <User className="h-5 w-5 text-gray-400 mr-2" />
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-0 bg-transparent focus-visible:ring-0 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center px-3 py-2 rounded-md bg-gray-900 border border-gray-700">
                  <Key className="h-5 w-5 text-gray-400 mr-2" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-0 bg-transparent focus-visible:ring-0 text-white"
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-ir-blue hover:bg-blue-700" 
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Continue"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <footer className="container mx-auto mt-10 text-center text-gray-400 text-sm">
        © 2025 Indian Railways. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginPage;
