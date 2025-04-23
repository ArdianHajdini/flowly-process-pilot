
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  CheckSquare, 
  Users, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { 
      label: "Dashboard", 
      icon: LayoutDashboard, 
      href: "/" 
    },
    { 
      label: "Prozess-Builder", 
      icon: ClipboardCheck, 
      href: "/process-builder" 
    },
    { 
      label: "Meine Aufgaben", 
      icon: CheckSquare, 
      href: "/tasks" 
    },
    { 
      label: "Team", 
      icon: Users, 
      href: "/team" 
    },
    { 
      label: "Einstellungen", 
      icon: Settings, 
      href: "/settings" 
    }
  ];

  return (
    <div 
      className={cn(
        "bg-white border-r border-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-2 flex-1">
            <div className="bg-primary rounded-md w-8 h-8 flex items-center justify-center text-primary-foreground font-bold">
              F
            </div>
            <h1 className="font-bold text-lg text-foreground">Flowly</h1>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto bg-primary rounded-md w-8 h-8 flex items-center justify-center text-primary-foreground font-bold">
            F
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(prev => !prev)}
          className="ml-auto"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      <nav className="flex-1 pt-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors",
                    isActive ? "bg-muted text-primary font-medium" : "text-muted-foreground",
                    collapsed && "justify-center px-0"
                  )
                }
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 mt-auto border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center font-medium">
            AB
          </div>
          {!collapsed && (
            <div className="flex-1">
              <div className="font-medium text-sm">Admin Benutzer</div>
              <div className="text-xs text-muted-foreground">admin@firma.de</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
