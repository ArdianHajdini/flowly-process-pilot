import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlusCircle, Activity, AlarmClockCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useProcesses } from "@/hooks/useProcesses";

const Dashboard = () => {
  const { processes, isLoading } = useProcesses();
  
  const activeProcesses = processes?.filter(p => p.status === 'active') || [];
  
  const statistics = [
    { 
      label: "Aktive Prozesse", 
      value: activeProcesses.length.toString(), 
      icon: Activity 
    },
    { 
      label: "Fällige Aufgaben", 
      value: "5", // Dies wird später mit echten Daten ersetzt
      icon: AlarmClockCheck 
    },
    { 
      label: "Team Mitglieder", 
      value: "8", // Dies wird später mit echten Daten ersetzt
      icon: Users 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Button asChild>
          <Link to="/process-builder">
            <PlusCircle className="mr-2 h-4 w-4" />
            Neuen Prozess erstellen
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {statistics.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center p-6">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aktive Prozesse</CardTitle>
          <CardDescription>Übersicht aller laufenden Prozesse</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Lädt...</div>
          ) : activeProcesses.length > 0 ? (
            <div className="space-y-6">
              {activeProcesses.map((process) => (
                <div key={process.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{process.name}</p>
                    <span className="text-sm text-muted-foreground">
                      Gestartet am {new Date(process.started_at).toLocaleDateString('de-DE')}
                    </span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              Keine aktiven Prozesse vorhanden
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
