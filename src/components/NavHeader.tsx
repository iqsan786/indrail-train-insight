
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogOut, User, TrainFront } from "lucide-react";

const NavHeader = () => {
  const { isAuthenticated, username, logout } = useAuth();

  return (
    <header className="bg-ir-dark border-b border-gray-800 py-3 px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <TrainFront className="h-6 w-6 text-ir-blue" />
            <Link to="/" className="text-xl font-bold text-white">
              Healthy Train
            </Link>
          </div>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">{username}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="text-gray-300 border-gray-700 hover:bg-gray-800"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-gray-300 border-gray-700 hover:bg-gray-800"
                >
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavHeader;
