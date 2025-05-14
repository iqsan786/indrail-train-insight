
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import NavHeader from "@/components/NavHeader";
import { getTrainData, TrainData } from "@/utils/trainData";
import { Button } from "@/components/ui/button";
import SensorDataTable from "@/components/SensorDataTable";
import TrainHealthIndex from "@/components/TrainHealthIndex";
import SensorDataChart from "@/components/SensorDataChart";
import { ArrowLeft, TrainFront, AlertTriangle } from "lucide-react";

const TrainDetailPage = () => {
  const { trainId } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [trainData, setTrainData] = useState<TrainData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    if (!trainId) {
      navigate("/dashboard");
      return;
    }

    // Simulate API call with a slight delay
    setLoading(true);
    setTimeout(() => {
      const data = getTrainData(trainId);
      if (data) {
        setTrainData(data);
        setError(null);
      } else {
        setTrainData(null);
        setError(`No data found for train number ${trainId}`);
      }
      setLoading(false);
    }, 800);
  }, [trainId, isAuthenticated, navigate]);

  const getStatusClass = () => {
    if (!trainData) return "";
    
    if (trainData.healthIndex >= 80) {
      return "text-green-500";
    } else if (trainData.healthIndex >= 60) {
      return "text-yellow-500";
    } else {
      return "text-red-500";
    }
  };

  const getStatusBadge = () => {
    if (!trainData) return null;
    
    const bgColor = trainData.healthIndex >= 80 
      ? "bg-green-900/30 text-green-500" 
      : trainData.healthIndex >= 60 
        ? "bg-yellow-900/30 text-yellow-500" 
        : "bg-red-900/30 text-red-500";
    
    const status = trainData.healthIndex >= 80 
      ? "Healthy" 
      : trainData.healthIndex >= 60 
        ? "Warning" 
        : "Critical";
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${bgColor}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-ir-dark">
      <NavHeader />

      <div className="container mx-auto py-6 px-4">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-ir-blue border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Loading train data...</p>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto py-20 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-red-900/20 rounded-full mb-4">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Data Not Found</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <Button 
              onClick={() => navigate("/dashboard")}
              className="bg-ir-blue hover:bg-blue-700"
            >
              Return to Dashboard
            </Button>
          </div>
        ) : trainData && (
          <>
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <TrainFront className={`h-6 w-6 ${getStatusClass()}`} />
                  <h1 className="text-2xl font-bold text-white">{trainData.trainName}</h1>
                  {getStatusBadge()}
                </div>
                <div className="px-3 py-1 bg-ir-dark border border-gray-700 rounded-md text-gray-300">
                  Train #{trainData.trainNumber}
                </div>
              </div>
              <p className="text-gray-400">
                Real-time health monitoring and sensor data
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <SensorDataChart trainData={trainData} />
              </div>
              <div>
                <TrainHealthIndex 
                  healthIndex={trainData.healthIndex}
                  suggestion={trainData.maintenanceSuggestion}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <SensorDataTable data={trainData.sensorData} />
              </div>
              <div className="md:col-span-1 lg:col-span-2 flex flex-col gap-6">
                {/* Additional panels could go here */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrainDetailPage;
