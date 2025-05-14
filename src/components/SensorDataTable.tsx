
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SensorData } from "@/utils/trainData";
import { Component, Gauge } from "lucide-react";

interface SensorDataTableProps {
  data: SensorData[];
}

const SensorDataTable = ({ data }: SensorDataTableProps) => {
  return (
    <Card className="dashboard-card">
      <CardHeader className="dashboard-card-header">
        <Gauge className="h-5 w-5 text-ir-blue" />
        <CardTitle>Live Sensor Data</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parameter</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.parameter} className="animate-fade-in">
                <TableCell>{item.parameter} ({item.unit})</TableCell>
                <TableCell className="font-mono text-right">
                  {typeof item.value === 'number' && item.value % 1 !== 0 
                    ? item.value.toFixed(2) 
                    : item.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SensorDataTable;
