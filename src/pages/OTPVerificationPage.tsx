
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrainFront, AlertCircle } from "lucide-react";
import OTPInput from "@/components/OTPInput";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // Get stored username and password from previous step
    const username = sessionStorage.getItem("username");
    
    // If username is not found, redirect back to login page
    if (!username) {
      navigate("/login");
      toast({
        title: "Session Expired",
        description: "Please login again",
        variant: "destructive",
      });
      return;
    }
    
    // Mock getting a phone number based on username
    setPhoneNumber("******" + username.substring(0, 4));
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp) {
      toast({
        title: "Required Field",
        description: "Please enter the OTP",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const username = sessionStorage.getItem("username") || "";
      const password = sessionStorage.getItem("password") || "";
      
      // Attempt to login with stored credentials and OTP
      const success = await login(username, password, otp);
      if (success) {
        // Clear session storage
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("password");
        
        // Navigate to dashboard
        navigate("/dashboard");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = () => {
    toast({
      title: "OTP Resent",
      description: "A new OTP has been sent to your mobile number",
    });
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
            <CardTitle className="text-2xl font-bold text-center text-white">OTP Verification</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Enter the OTP sent to your registered mobile number: {phoneNumber}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <OTPInput
                  length={6}
                  value={otp}
                  onChange={setOtp}
                />
                <p className="text-xs text-center text-gray-500 mt-2">
                  <AlertCircle className="h-3 w-3 inline mr-1" />
                  For demo purposes, use OTP: 123456
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-ir-blue hover:bg-blue-700" 
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify & Login"}
              </Button>
              
              <div className="text-center">
                <Button 
                  type="button" 
                  variant="link" 
                  onClick={handleResendOTP} 
                  className="text-gray-400 hover:text-ir-blue"
                >
                  Didn't receive code? Resend OTP
                </Button>
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

export default OTPVerificationPage;
