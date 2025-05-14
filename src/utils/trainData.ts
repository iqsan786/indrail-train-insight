
// Mock data for train sensors
export interface SensorData {
  parameter: string;
  value: number;
  unit: string;
}

export interface TrainData {
  trainNumber: string;
  trainName: string;
  healthIndex: number;
  maintenanceSuggestion: string;
  status: 'healthy' | 'warning' | 'critical';
  sensorData: SensorData[];
  historicalData: {
    time: number;
    brakeTemperature: number;
    axleVibration: number;
    wheelWear: number;
    engineLoad: number;
    batteryVoltage: number;
  }[];
}

// Function to determine status based on health index
const getStatusFromIndex = (index: number): 'healthy' | 'warning' | 'critical' => {
  if (index >= 80) return 'healthy';
  if (index >= 60) return 'warning';
  return 'critical';
};

// Function to generate maintenance suggestion based on health index
const getMaintenanceSuggestion = (index: number): string => {
  if (index >= 80) {
    return "Train is healthy. No immediate action needed.";
  } else if (index >= 60) {
    return "Routine maintenance recommended within the next 7 days.";
  } else if (index >= 40) {
    return "Immediate attention required. Schedule maintenance within 48 hours.";
  } else {
    return "Critical condition. Train should be taken out of service for immediate inspection.";
  }
};

// Generate mock historical data
const generateHistoricalData = () => {
  const data = [];
  for (let i = 0; i <= 30; i += 0.5) {
    const time = i;
    const brakeTemperature = 40 + Math.sin(i) * 30 + Math.random() * 10;
    const axleVibration = 2 + Math.sin(i / 2) * 1 + Math.random() * 0.5;
    const wheelWear = 30 + Math.cos(i / 3) * 15 + Math.random() * 5;
    const engineLoad = 50 + Math.sin(i / 2.5) * 30 + Math.random() * 10;
    const batteryVoltage = 12 + Math.sin(i / 10) * 2 + Math.random() * 0.5;
    
    data.push({
      time,
      brakeTemperature,
      axleVibration,
      wheelWear,
      engineLoad,
      batteryVoltage
    });
  }
  return data;
};

// Mock database of trains
const mockTrains: Record<string, TrainData> = {
  '12301': {
    trainNumber: '12301',
    trainName: 'Rajdhani Express',
    healthIndex: 90,
    maintenanceSuggestion: "Train is healthy. No immediate action needed.",
    status: 'healthy',
    sensorData: [
      { parameter: 'Brake Temperature', value: 78, unit: '°C' },
      { parameter: 'Axle Vibration', value: 2.34, unit: 'mm/s' },
      { parameter: 'Wheel Wear', value: 38, unit: '%' },
      { parameter: 'Engine Load', value: 92, unit: '%' },
      { parameter: 'Battery Voltage', value: 12.5, unit: 'V' }
    ],
    historicalData: generateHistoricalData()
  },
  '12802': {
    trainNumber: '12802',
    trainName: 'Purushottam Express',
    healthIndex: 65,
    maintenanceSuggestion: "Routine maintenance recommended within the next 7 days.",
    status: 'warning',
    sensorData: [
      { parameter: 'Brake Temperature', value: 92, unit: '°C' },
      { parameter: 'Axle Vibration', value: 3.87, unit: 'mm/s' },
      { parameter: 'Wheel Wear', value: 49, unit: '%' },
      { parameter: 'Engine Load', value: 78, unit: '%' },
      { parameter: 'Battery Voltage', value: 11.8, unit: 'V' }
    ],
    historicalData: generateHistoricalData()
  },
  '18030': {
    trainNumber: '18030',
    trainName: 'Shalimar Express',
    healthIndex: 45,
    maintenanceSuggestion: "Immediate attention required. Schedule maintenance within 48 hours.",
    status: 'critical',
    sensorData: [
      { parameter: 'Brake Temperature', value: 105, unit: '°C' },
      { parameter: 'Axle Vibration', value: 5.12, unit: 'mm/s' },
      { parameter: 'Wheel Wear', value: 68, unit: '%' },
      { parameter: 'Engine Load', value: 97, unit: '%' },
      { parameter: 'Battery Voltage', value: 10.5, unit: 'V' }
    ],
    historicalData: generateHistoricalData()
  },
  '22201': {
    trainNumber: '22201',
    trainName: 'Duronto Express',
    healthIndex: 88,
    maintenanceSuggestion: "Train is healthy. No immediate action needed.",
    status: 'healthy',
    sensorData: [
      { parameter: 'Brake Temperature', value: 69, unit: '°C' },
      { parameter: 'Axle Vibration', value: 1.98, unit: 'mm/s' },
      { parameter: 'Wheel Wear', value: 32, unit: '%' },
      { parameter: 'Engine Load', value: 85, unit: '%' },
      { parameter: 'Battery Voltage', value: 12.8, unit: 'V' }
    ],
    historicalData: generateHistoricalData()
  }
};

export const getTrainData = (trainNumber: string): TrainData | null => {
  return mockTrains[trainNumber] || null;
};

export const getAllTrains = (): TrainData[] => {
  return Object.values(mockTrains);
};
