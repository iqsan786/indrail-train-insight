
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavHeader from "@/components/NavHeader";
import TrainSearchForm from "@/components/TrainSearchForm";
import { TrainFront } from "lucide-react";

const DashboardPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-ir-dark">
      <NavHeader />

      <main className="flex-1 container mx-auto my-10 px-4">
        <div className="text-center mb-10">
          <div className="flex justify-center items-center mb-4">
            <div className="p-3 bg-blue-900/20 rounded-full">
              <TrainFront className="h-8 w-8 text-ir-blue" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Train Monitoring Dashboard</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Enter a train number to view real-time health metrics and sensor data.
          </p>
        </div>

        <div className="mb-12">
          <TrainSearchForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {["12301", "12802", "18030"].map((trainNumber) => (
            <div 
              key={trainNumber}
              onClick={() => navigate(`/dashboard/${trainNumber}`)}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-750 hover:border-gray-600 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrainFront className="h-5 w-5 text-ir-blue" />
                  <span className="font-semibold text-white">Train #{trainNumber}</span>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  trainNumber === "12301" 
                    ? "bg-green-100 text-green-800" 
                    : trainNumber === "12802" 
                      ? "bg-yellow-100 text-yellow-800" 
                      : "bg-red-100 text-red-800"
                }`}>
                  {trainNumber === "12301" 
                    ? "Healthy" 
                    : trainNumber === "12802" 
                      ? "Warning" 
                      : "Critical"}
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                {trainNumber === "12301" 
                  ? "Rajdhani Express" 
                  : trainNumber === "12802" 
                    ? "Purushottam Express" 
                    : "Shalimar Express"}
              </p>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full ${
                    trainNumber === "12301" 
                      ? "bg-green-500" 
                      : trainNumber === "12802" 
                        ? "bg-yellow-500" 
                        : "bg-red-500"
                  }`} 
                  style={{ width: trainNumber === "12301" ? "90%" : trainNumber === "12802" ? "65%" : "45%" }}
                />
              </div>
              <div className="mt-2 text-right text-xs text-gray-400">
                Click to view details
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
