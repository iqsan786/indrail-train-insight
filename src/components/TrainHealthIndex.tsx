
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, Wrench, AlertTriangle, AlertCircle } from "lucide-react";

interface TrainHealthIndexProps {
  healthIndex: number;
  suggestion: string;
}

const TrainHealthIndex = ({ healthIndex, suggestion }: TrainHealthIndexProps) => {
  const getStatusColor = () => {
    if (healthIndex >= 80) return "bg-green-500";
    if (healthIndex >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusIcon = () => {
    if (healthIndex >= 80) return <Check className="h-5 w-5 text-green-500" />;
    if (healthIndex >= 60) return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    return <AlertCircle className="h-5 w-5 text-red-500" />;
  };

  return (
    <Card className="dashboard-card">
      <CardHeader className="dashboard-card-header">
        <div className="h-5 w-5 bg-gradient-to-br from-ir-blue to-ir-red rounded" />
        <CardTitle>Train Health Index</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <div className="text-2xl font-semibold mb-1">THI Score</div>
          <div className="text-5xl font-bold mb-4 flex items-center justify-center">
            <span className="text-ir-gold">{healthIndex}</span>
            <span className="text-gray-400 text-3xl ml-2">/ 100</span>
          </div>
          <Progress 
            value={healthIndex} 
            className="h-2 mb-8" 
            indicatorClassName={getStatusColor()}
          />
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="h-5 w-5 text-ir-red" />
            <div className="font-semibold text-lg">Maintenance Suggestion</div>
          </div>
          <div className="flex items-start gap-2 pl-1 mt-3">
            {getStatusIcon()}
            <p className="text-gray-300">{suggestion}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainHealthIndex;
