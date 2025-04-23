
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlusCircle, Activity, ClockCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Beispieldaten - später durch echte Daten aus der DB ersetzen
  const activeProcesses = [
    { id: 1, name: "Onboarding neuer Mitarbeiter", progress: 75, dueDate: "2025-05-01" },
    { id: 2, name: "Quartalsabschluss", progress: 30, dueDate: "2025-04-30" },
    { id: 3, name: "Urlaubsantrag", progress: 90, dueDate: "2025-04-25" }
  ];

  const statistics = [
    { label: "Aktive Prozesse", value: "12", icon: Activity },
    { label: "Fällige Aufgaben", value: "5", icon: ClockCheck },
    { label: "Team Mitglieder", value: "8", icon: Users },
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

      {/* Statistik-Karten */}
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

      {/* Aktive Prozesse */}
      <Card>
        <CardHeader>
          <CardTitle>Aktive Prozesse</CardTitle>
          <CardDescription>Übersicht aller laufenden Prozesse</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activeProcesses.map((process) => (
              <div key={process.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{process.name}</p>
                  <span className="text-sm text-muted-foreground">
                    Fällig am {new Date(process.dueDate).toLocaleDateString('de-DE')}
                  </span>
                </div>
                <Progress value={process.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Aktivitäten */}
      <Card>
        <CardHeader>
          <CardTitle>Neueste Aktivitäten</CardTitle>
          <CardDescription>Die letzten Änderungen und Updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Später durch echte Aktivitätsdaten ersetzen */}
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Activity className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Schritt abgeschlossen</p>
                <p className="text-sm text-muted-foreground">
                  Max Mustermann hat "Dokumentenprüfung" abgeschlossen
                </p>
                <p className="text-xs text-muted-foreground">Vor 2 Stunden</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
