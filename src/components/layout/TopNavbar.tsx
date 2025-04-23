
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";
import { useState } from "react";

const TopNavbar = () => {
  const [notifications] = useState(3);

  return (
    <header className="bg-white border-b border-border py-2 px-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Input 
            placeholder="Prozesse durchsuchen..." 
            className="max-w-xs"
          />
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="icon" className="relative">
            <Bell size={18} />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications > 9 ? '9+' : notifications}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
