
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle, Save } from "lucide-react";
import { StepForm } from "@/components/process/StepForm";
import { useProcessTemplates } from "@/hooks/useProcessTemplates";

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  assignee_role: string;
  needs_upload: boolean;
  needs_confirmation: boolean;
  confirmation_type: "checkbox" | "text" | null;
}

const ProcessBuilder = () => {
  const [processName, setProcessName] = useState("");
  const [processDescription, setProcessDescription] = useState("");
  const [steps, setSteps] = useState<ProcessStep[]>([
    {
      id: "step-1",
      title: "Neuer Schritt",
      description: "",
      assignee_role: "employee",
      needs_upload: false,
      needs_confirmation: false,
      confirmation_type: null,
    }
  ]);

  const { saveTemplate } = useProcessTemplates();

  const addStep = () => {
    const newStepId = `step-${steps.length + 1}`;
    const newStep: ProcessStep = {
      id: newStepId,
      title: "Neuer Schritt",
      description: "",
      assignee_role: "employee",
      needs_upload: false,
      needs_confirmation: false,
      confirmation_type: null,
    };
    
    setSteps([...steps, newStep]);
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  const updateStep = (id: string, field: keyof ProcessStep, value: any) => {
    setSteps(steps.map(step => {
      if (step.id === id) {
        return { ...step, [field]: value };
      }
      return step;
    }));
  };

  const handleSave = async () => {
    const templateSteps = steps.map((step, index) => ({
      title: step.title,
      description: step.description,
      assignee_role: step.assignee_role,
      needs_upload: step.needs_upload,
      needs_confirmation: step.needs_confirmation,
      confirmation_type: step.confirmation_type,
      order_index: index,
    }));

    await saveTemplate.mutateAsync({
      name: processName,
      description: processDescription || null,
      steps: templateSteps,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Prozess-Builder</h1>
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={saveTemplate.isPending}>
            <Save className="mr-2 h-4 w-4" />
            Als Vorlage speichern
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

            <div>
              <Label htmlFor="process-description">Beschreibung</Label>
              <Textarea
                id="process-description"
                value={processDescription}
                onChange={e => setProcessDescription(e.target.value)}
                placeholder="Beschreiben Sie den Prozess..."
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <StepForm
                  key={step.id}
                  step={step}
                  index={index}
                  onUpdate={updateStep}
                  onRemove={removeStep}
                />
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
