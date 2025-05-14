
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { TrainFront, Shield, BarChart3, Bell, Wrench, LogIn, UserPlus } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-ir-dark to-gray-900 py-20 px-6 md:py-32">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <div className="flex items-center gap-3 mb-6">
                <TrainFront className="h-8 w-8 text-ir-blue" />
                <h1 className="text-3xl md:text-4xl font-bold text-white">Healthy Train</h1>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Advanced Train Health <span className="text-ir-blue">Monitoring System</span>
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                A cutting-edge solution for monitoring train health metrics in real-time, 
                enabling predictive maintenance and ensuring passenger safety.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login">
                  <Button size="lg" className="bg-ir-blue hover:bg-blue-700">
                    <LogIn className="mr-2 h-5 w-5" />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" variant="outline" className="border-ir-blue text-ir-blue hover:bg-gray-800">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Register
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-1 bg-gradient-to-r from-ir-blue to-ir-red rounded-xl blur-xl opacity-30"></div>
                <div className="relative bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-2xl">
                  <div className="text-center mb-6">
                    <div className="inline-block p-3 bg-blue-900/30 rounded-full mb-4">
                      <Shield className="h-8 w-8 text-ir-blue" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Train Health Index</h3>
                    <div className="text-5xl font-bold my-4 text-ir-gold">90 / 100</div>
                    <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
                      <div className="bg-ir-blue h-2.5 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div className="border-t border-gray-800 pt-4">
                    <div className="flex items-center gap-2 text-green-500 mb-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">All systems operational</span>
                    </div>
                    <div className="text-gray-400 text-sm">
                      Last updated: 14 May 2025, 09:45 AM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-gray-900 py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-gray-700 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-900/30 rounded-full">
                    <BarChart3 className="h-6 w-6 text-ir-blue" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3 text-white">Real-time Monitoring</h3>
                <p className="text-gray-300 text-center">
                  Continuous monitoring of critical train systems with real-time data visualization and analysis.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-900/30 rounded-full">
                    <Bell className="h-6 w-6 text-ir-blue" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3 text-white">Proactive Alerts</h3>
                <p className="text-gray-300 text-center">
                  Advanced notification system that alerts operators about potential issues before they become problems.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-900/30 rounded-full">
                    <Wrench className="h-6 w-6 text-ir-blue" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3 text-white">Predictive Maintenance</h3>
                <p className="text-gray-300 text-center">
                  ML-powered analysis that predicts maintenance needs, reducing downtime and improving safety.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-ir-dark border-t border-gray-800 py-8 px-6 mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <TrainFront className="h-5 w-5 text-ir-blue" />
              <span className="text-white font-semibold">Healthy Train</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 Indian Railways. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
