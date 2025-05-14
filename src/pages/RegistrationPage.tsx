
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrainFront, Key, User, Mail, Phone, CreditCard } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    aadhar: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (Object.values(formData).some(value => !value)) {
      toast({
        title: "Required Fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (formData.aadhar.length !== 12 || !/^\d+$/.test(formData.aadhar)) {
      toast({
        title: "Invalid Aadhaar",
        description: "Please enter a valid 12-digit Aadhaar number",
        variant: "destructive",
      });
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      toast({
        title: "Invalid Phone",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Mock registration process - in a real app, this would call an API
      setTimeout(() => {
        toast({
          title: "Registration Successful",
          description: "Your account has been created. Please login.",
        });
        navigate("/login");
      }, 1500);
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

      <div className="flex-1 flex items-center justify-center py-8">
        <Card className="w-full max-w-md bg-gray-800 border-gray-700 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white">Official Registration</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Create your account to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center px-3 py-2 rounded-md bg-gray-900 border border-gray-700">
                  <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                  <Input
                    type="text"
                    name="aadhar"
                    placeholder="Aadhaar Number"
                    value={formData.aadhar}
                    onChange={handleChange}
                    className="border-0 bg-transparent focus-visible:ring-0 text-white"
                    maxLength={12}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center px-3 py-2 rounded-md bg-gray-900 border border-gray-700">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-0 bg-transparent focus-visible:ring-0 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center px-3 py-2 rounded-md bg-gray-900 border border-gray-700">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border-0 bg-transparent focus-visible:ring-0 text-white"
                    maxLength={10}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center px-3 py-2 rounded-md bg-gray-900 border border-gray-700">
                  <User className="h-5 w-5 text-gray-400 mr-2" />
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="border-0 bg-transparent focus-visible:ring-0 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center px-3 py-2 rounded-md bg-gray-900 border border-gray-700">
                  <Key className="h-5 w-5 text-gray-400 mr-2" />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border-0 bg-transparent focus-visible:ring-0 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center px-3 py-2 rounded-md bg-gray-900 border border-gray-700">
                  <Key className="h-5 w-5 text-gray-400 mr-2" />
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="border-0 bg-transparent focus-visible:ring-0 text-white"
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-ir-blue hover:bg-blue-700 mt-6" 
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Register"}
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <Button 
                    type="button" 
                    variant="link" 
                    className="p-0 text-ir-blue hover:text-blue-400"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                </p>
              </div>
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

export default RegistrationPage;
