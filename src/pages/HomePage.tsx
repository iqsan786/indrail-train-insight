
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrainFront } from "lucide-react";
import NavHeader from "@/components/NavHeader";
import { useAuth } from "@/contexts/AuthContext";

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-ir-dark to-gray-900 flex flex-col">
      <NavHeader />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <TrainFront className="h-16 w-16 text-ir-blue" />
          <h1 className="text-5xl font-bold text-white">Healthy Train</h1>
        </div>
        
        <p className="text-xl text-gray-300 max-w-2xl mb-8">
          The smart monitoring system for Indian Railways, ensuring safe and efficient train operations through advanced sensor analytics.
        </p>
        
        <div className="space-x-4">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button className="bg-ir-blue hover:bg-blue-700 text-white px-8 py-6 text-lg">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button className="bg-ir-blue hover:bg-blue-700 text-white px-8 py-6 text-lg">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="border-ir-blue text-ir-blue hover:bg-ir-blue/10 px-8 py-6 text-lg">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </main>
      
      <footer className="container mx-auto py-6 text-center text-gray-400 text-sm">
        © 2025 Indian Railways. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
