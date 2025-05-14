
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TrainSearchForm = () => {
  const [trainNumber, setTrainNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trainNumber) {
      toast({
        title: "Required Field",
        description: "Please enter a train number",
        variant: "destructive",
      });
      return;
    }

    // Test numbers: 12301, 12802, 18030, 22201
    navigate(`/dashboard/${trainNumber}`);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Enter Train Number (e.g., 12301)"
          value={trainNumber}
          onChange={(e) => setTrainNumber(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" className="bg-ir-blue hover:bg-blue-700">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
    </form>
  );
};

export default TrainSearchForm;
