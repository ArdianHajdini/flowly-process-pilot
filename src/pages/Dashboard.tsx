
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckSquare, AlertTriangle, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  // Mock data
  const activeProcesses = [
    { id: 1, name: "Onboarding neuer Mitarbeiter", progress: 75, dueDate: "2025-05-01", assignee: "Personalabteilung", status: "In Bearbeitung" },
    { id: 2, name: "Monatsabschluss April", progress: 45, dueDate: "2025-04-30", assignee: "Finanzen", status: "In Bearbeitung" },
    { id: 3, name: "Produkteinführung Version 2.0", progress: 30, dueDate: "2025-05-15", assignee: "Marketing", status: "In Bearbeitung" },
    { id: 4, name: "Quartalsreview Q1", progress: 90, dueDate: "2025-04-25", assignee: "Management", status: "Fast abgeschlossen" },
  ];

  const myTasks = [
    { id: 1, processName: "Onboarding neuer Mitarbeiter", task: "Zugangsdaten erstellen", dueDate: "2025-04-26", status: "Überfällig", isLate: true },
    { id: 2, processName: "Monatsabschluss April", task: "Belege prüfen", dueDate: "2025-04-29", status: "Fällig bald", isLate: false },
    { id: 3, processName: "Quartalsreview Q1", task: "Bericht finalisieren", dueDate: "2025-04-25", status: "Heute fällig", isLate: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Button className="bg-primary">+ Neuer Prozess</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock size={16} className="mr-2 text-muted-foreground" />
              Aktive Prozesse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeProcesses.length}</div>
            <p className="text-xs text-muted-foreground mt-1">2 in den letzten 7 Tagen</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckSquare size={16} className="mr-2 text-muted-foreground" />
              Meine Aufgaben
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{myTasks.length}</div>
            <p className="text-xs text-muted-foreground mt-1">1 überfällig</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle size={16} className="mr-2 text-muted-foreground" />
              Überfällige Aufgaben
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
            <p className="text-xs text-muted-foreground mt-1">Fällig vor 2 Tagen</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="processes">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="processes">Aktive Prozesse</TabsTrigger>
            <TabsTrigger value="tasks">Meine Aufgaben</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter size={16} />
            Filter
          </Button>
        </div>
        
        <TabsContent value="processes">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 py-3 px-4 text-sm font-medium text-muted-foreground border-b">
                  <div className="col-span-5">Prozess</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Verantwortlich</div>
                  <div className="col-span-2">Fällig am</div>
                  <div className="col-span-1 text-right">Fortschritt</div>
                </div>
                
                {activeProcesses.map((process) => (
                  <div 
                    key={process.id} 
                    className="grid grid-cols-12 py-3 px-4 border-b last:border-0 items-center hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <div className="col-span-5 font-medium">{process.name}</div>
                    <div className="col-span-2">
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-800">
                        {process.status}
                      </div>
                    </div>
                    <div className="col-span-2 text-muted-foreground">{process.assignee}</div>
                    <div className="col-span-2 text-muted-foreground">{new Date(process.dueDate).toLocaleDateString('de-DE')}</div>
                    <div className="col-span-1 flex items-center gap-2 justify-end">
                      <span className="text-xs font-medium">{process.progress}%</span>
                      <Progress value={process.progress} className="h-2 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 py-3 px-4 text-sm font-medium text-muted-foreground border-b">
                  <div className="col-span-5">Aufgabe</div>
                  <div className="col-span-3">Prozess</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Fällig am</div>
                </div>
                
                {myTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="grid grid-cols-12 py-3 px-4 border-b last:border-0 items-center hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <div className="col-span-5 font-medium">{task.task}</div>
                    <div className="col-span-3 text-muted-foreground">{task.processName}</div>
                    <div className="col-span-2">
                      <div className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        task.isLate ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                      )}>
                        {task.status}
                      </div>
                    </div>
                    <div className="col-span-2 text-muted-foreground">{new Date(task.dueDate).toLocaleDateString('de-DE')}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
