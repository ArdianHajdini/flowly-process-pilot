
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  Filter,
  Clock,
  AlertCircle,
  FileText,
  ChevronRight,
} from "lucide-react";

interface Task {
  id: string;
  processName: string;
  processId: string;
  step: string;
  dueDate: string;
  status: "pending" | "completed" | "overdue";
  hasAttachments: boolean;
}

const Tasks = () => {
  // Mock data
  const [tasks] = useState<Task[]>([
    {
      id: "task-1",
      processName: "Onboarding neuer Mitarbeiter",
      processId: "proc-1",
      step: "IT-Zugangsdaten erstellen",
      dueDate: "2025-04-26",
      status: "overdue",
      hasAttachments: false,
    },
    {
      id: "task-2",
      processName: "Monatsabschluss April",
      processId: "proc-2",
      step: "Belege prüfen",
      dueDate: "2025-04-29",
      status: "pending",
      hasAttachments: true,
    },
    {
      id: "task-3",
      processName: "Quartalsreview Q1",
      processId: "proc-4",
      step: "Bericht finalisieren",
      dueDate: "2025-04-25",
      status: "pending",
      hasAttachments: true,
    },
    {
      id: "task-4",
      processName: "Produkteinführung Version 2.0",
      processId: "proc-3",
      step: "Marketingmaterialien freigeben",
      dueDate: "2025-05-10",
      status: "pending",
      hasAttachments: false,
    },
  ]);

  const completedTasks = [
    {
      id: "task-5",
      processName: "Onboarding neuer Mitarbeiter",
      processId: "proc-1",
      step: "Arbeitsvertrag vorbereiten",
      completedDate: "2025-04-20",
      hasAttachments: true,
    },
    {
      id: "task-6",
      processName: "Monatsabschluss März",
      processId: "proc-5",
      step: "Belege prüfen",
      completedDate: "2025-03-31",
      hasAttachments: false,
    },
  ];

  // In a real app, this would update the task status
  const completeTask = (taskId: string) => {
    alert(`Aufgabe ${taskId} als erledigt markiert`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Meine Aufgaben</h1>
        <Button variant="outline" className="gap-2">
          <Filter size={16} />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <Clock size={24} className="text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">3</div>
              <p className="text-muted-foreground text-sm">Ausstehend</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle size={24} className="text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">1</div>
              <p className="text-muted-foreground text-sm">Überfällig</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">2</div>
              <p className="text-muted-foreground text-sm">Abgeschlossen</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Aktive Aufgaben</TabsTrigger>
          <TabsTrigger value="completed">Abgeschlossen</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="space-y-4">
            {tasks.map((task) => (
              <Card key={task.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4 flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="text-sm text-muted-foreground">{task.processName}</div>
                      <h4 className="font-medium">{task.step}</h4>
                      <div className="flex items-center gap-2 mt-2 text-sm">
                        {task.hasAttachments && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <FileText size={14} />
                            <span>Anhänge</span>
                          </div>
                        )}
                        <div 
                          className={`flex items-center gap-1 ${
                            task.status === "overdue" ? "text-red-600" : "text-amber-600"
                          }`}
                        >
                          <Clock size={14} />
                          <span>
                            {task.status === "overdue" ? "Überfällig: " : "Fällig am: "}
                            {new Date(task.dueDate).toLocaleDateString('de-DE')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="gap-1"
                      onClick={() => completeTask(task.id)}
                    >
                      Aufgabe anzeigen
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                  <div className="bg-muted p-2 border-t">
                    <div className="flex items-center justify-between text-xs">
                      <span>Prozessfortschritt</span>
                      <span>3/5 Schritte</span>
                    </div>
                    <Progress value={60} className="h-1.5 mt-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="space-y-4">
            {completedTasks.map((task) => (
              <Card key={task.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">{task.processName}</div>
                      <h4 className="font-medium">{task.step}</h4>
                      <div className="flex items-center gap-2 mt-2 text-sm">
                        {task.hasAttachments && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <FileText size={14} />
                            <span>Anhänge</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle size={14} />
                          <span>
                            Abgeschlossen am: {new Date(task.completedDate).toLocaleDateString('de-DE')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="gap-1"
                      onClick={() => {}}
                    >
                      Details
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tasks;
