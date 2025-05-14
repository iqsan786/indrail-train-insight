
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { TrainData } from "@/utils/trainData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SensorDataChartProps {
  trainData: TrainData;
}

const SensorDataChart = ({ trainData }: SensorDataChartProps) => {
  return (
    <Card className="dashboard-card">
      <CardHeader className="dashboard-card-header">
        <BarChart3 className="h-5 w-5 text-ir-blue" />
        <CardTitle>Real-time Sensor Data</CardTitle>
      </CardHeader>
      <CardContent className="p-4 h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trainData.historicalData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="time" 
              label={{ value: 'Time (s)', position: 'insideBottomRight', offset: -10 }}
              stroke="#888"
            />
            <YAxis label={{ value: 'Sensor Value', angle: -90, position: 'insideLeft' }} stroke="#888" />
            <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #333' }} />
            <Legend />
            <Line type="monotone" dataKey="brakeTemperature" stroke="#4299E1" name="Brake Temperature (°C)" dot={false} />
            <Line type="monotone" dataKey="axleVibration" stroke="#F56565" name="Axle Vibration (mm/s)" dot={false} />
            <Line type="monotone" dataKey="wheelWear" stroke="#38B2AC" name="Wheel Wear (%)" dot={false} />
            <Line type="monotone" dataKey="engineLoad" stroke="#9F7AEA" name="Engine Load (%)" dot={false} />
            <Line type="monotone" dataKey="batteryVoltage" stroke="#ED8936" name="Battery Voltage (V)" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SensorDataChart;
