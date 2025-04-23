
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Trash2, GripVertical, PlusCircle, Save, Clock, User, FileText, CheckSquare } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate?: string;
  relativeDueDate?: {
    relatedToStep: string;
    hours: number;
  };
  needsUpload: boolean;
  needsConfirmation: boolean;
  confirmationType: "checkbox" | "text";
  notifyOnLate?: string[];
}

const ProcessBuilder = () => {
  const [processName, setProcessName] = useState("");
  const [steps, setSteps] = useState<ProcessStep[]>([
    {
      id: "step-1",
      title: "Schritt 1",
      description: "Beschreibung für den ersten Schritt",
      assignee: "manager",
      needsUpload: true,
      needsConfirmation: true,
      confirmationType: "checkbox",
    }
  ]);

  const addStep = () => {
    const newStepId = `step-${steps.length + 1}`;
    const newStep: ProcessStep = {
      id: newStepId,
      title: `Schritt ${steps.length + 1}`,
      description: "",
      assignee: "manager",
      needsUpload: false,
      needsConfirmation: false,
      confirmationType: "checkbox",
    };
    
    setSteps([...steps, newStep]);
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  // This would be expanded for a real drag-and-drop implementation
  // Here we just show the UI elements that would be used
  const moveStep = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === steps.length - 1)
    ) {
      return;
    }

    const newSteps = [...steps];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
    
    setSteps(newSteps);
  };

  const updateStep = (id: string, field: keyof ProcessStep, value: any) => {
    setSteps(steps.map(step => {
      if (step.id === id) {
        return { ...step, [field]: value };
      }
      return step;
    }));
  };

  const saveProcess = () => {
    // Would connect to backend in real application
    alert(`Prozess "${processName}" mit ${steps.length} Schritten gespeichert`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Prozess-Builder</h1>
        <div className="flex gap-2">
          <Button variant="outline">Als Vorlage speichern</Button>
          <Button onClick={saveProcess}>
            <Save className="mr-2 h-4 w-4" />
            Prozess speichern
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4 max-w-3xl mx-auto">
            <div>
              <Label htmlFor="process-name">Prozessname</Label>
              <Input
                id="process-name"
                value={processName}
                onChange={e => setProcessName(e.target.value)}
                placeholder="z.B. Onboarding neuer Mitarbeiter"
                className="mt-1"
              />
            </div>

            <Separator className="my-6" />

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={step.id} className="border rounded-lg p-4 space-y-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="cursor-move text-muted-foreground hover:text-foreground">
                        <GripVertical size={20} />
                      </div>
                      <h3 className="font-medium">Schritt {index + 1}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeStep(step.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor={`${step.id}-title`}>Titel</Label>
                      <Input
                        id={`${step.id}-title`}
                        value={step.title}
                        onChange={e => updateStep(step.id, "title", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`${step.id}-description`}>Beschreibung</Label>
                      <Textarea
                        id={`${step.id}-description`}
                        value={step.description}
                        onChange={e => updateStep(step.id, "description", e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`${step.id}-assignee`} className="flex items-center gap-2">
                          <User size={16} />
                          Zuständig
                        </Label>
                        <Select
                          value={step.assignee}
                          onValueChange={value => updateStep(step.id, "assignee", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Rolle auswählen" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="manager">Leitung</SelectItem>
                            <SelectItem value="employee">Mitarbeiter</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor={`${step.id}-due-date`} className="flex items-center gap-2">
                          <Clock size={16} />
                          Fälligkeitsdatum
                        </Label>
                        <div className="flex gap-2 items-center mt-1">
                          <Select 
                            defaultValue="fixed"
                            onValueChange={() => {}}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fixed">Festes Datum</SelectItem>
                              <SelectItem value="relative">Relativ zum vorherigen Schritt</SelectItem>
                            </SelectContent>
                          </Select>

                          <Input 
                            type="date" 
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-2">
                        <div className="pt-1">
                          <input 
                            type="checkbox" 
                            id={`${step.id}-needs-upload`}
                            checked={step.needsUpload}
                            onChange={e => updateStep(step.id, "needsUpload", e.target.checked)}
                            className="rounded"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`${step.id}-needs-upload`} className="flex items-center gap-2">
                            <FileText size={16} />
                            Dateiupload erlauben
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Benutzer können Dokumente hochladen
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="pt-1">
                          <input 
                            type="checkbox" 
                            id={`${step.id}-needs-confirmation`}
                            checked={step.needsConfirmation}
                            onChange={e => updateStep(step.id, "needsConfirmation", e.target.checked)}
                            className="rounded"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`${step.id}-needs-confirmation`} className="flex items-center gap-2">
                            <CheckSquare size={16} />
                            Bestätigung benötigt
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Benutzer müssen den Abschluss bestätigen
                          </p>
                          {step.needsConfirmation && (
                            <div className="mt-2">
                              <Select
                                value={step.confirmationType}
                                onValueChange={value => updateStep(step.id, "confirmationType", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="checkbox">Checkbox</SelectItem>
                                  <SelectItem value="text">Textfeld</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Button 
                variant="outline" 
                className="w-full py-6 border-dashed flex items-center gap-2"
                onClick={addStep}
              >
                <PlusCircle size={18} />
                Schritt hinzufügen
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcessBuilder;
