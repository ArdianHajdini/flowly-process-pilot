import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  assignee_role: string;
  needs_upload: boolean;
  needs_confirmation: boolean;
  confirmation_type: "checkbox" | "text" | null;
}

interface StepFormProps {
  step: ProcessStep;
  index: number;
  onUpdate: (id: string, field: keyof ProcessStep, value: any) => void;
  onRemove: (id: string) => void;
}

export const StepForm = ({ step, index, onUpdate, onRemove }: StepFormProps) => {
  return (
    <div 
      className={cn(
        "border rounded-lg p-4 space-y-4",
        "bg-gradient-to-br from-white/80 to-[#f0f4f8]/50",
        "shadow-sm hover:shadow-md transition-shadow duration-300",
        "border-[#9b87f5]/30 hover:border-[#9b87f5]/50"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="cursor-move text-[#6E59A5]/70 hover:text-[#6E59A5]">
            <GripVertical size={20} />
          </div>
          <h3 className="font-medium text-gray-700">Schritt {index + 1}</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRemove(step.id)}
          className="text-red-500 hover:bg-red-50 border-red-200/50"
        >
          <Trash2 size={16} />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label 
            htmlFor={`${step.id}-title`} 
            className="text-gray-700"
          >
            Titel
          </Label>
          <Input
            id={`${step.id}-title`}
            value={step.title}
            onChange={e => onUpdate(step.id, "title", e.target.value)}
            className={cn(
              "mt-1 border-[#9b87f5]/50 focus:border-[#9b87f5] focus:ring-[#9b87f5]/50",
              "transition-colors duration-300"
            )}
          />
        </div>

        <div>
          <Label htmlFor={`${step.id}-description`}>Beschreibung</Label>
          <Textarea
            id={`${step.id}-description`}
            value={step.description}
            onChange={e => onUpdate(step.id, "description", e.target.value)}
            className="mt-1"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor={`${step.id}-assignee`}>Zuständige Rolle</Label>
          <Select
            value={step.assignee_role}
            onValueChange={value => onUpdate(step.id, "assignee_role", value)}
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

        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-2">
            <Checkbox
              id={`${step.id}-needs-upload`}
              checked={step.needs_upload}
              onCheckedChange={checked => onUpdate(step.id, "needs_upload", checked)}
            />
            <div>
              <Label htmlFor={`${step.id}-needs-upload`}>Datei-Upload erforderlich</Label>
              <p className="text-sm text-muted-foreground">
                Benutzer müssen eine Datei hochladen
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id={`${step.id}-needs-confirmation`}
              checked={step.needs_confirmation}
              onCheckedChange={checked => onUpdate(step.id, "needs_confirmation", checked)}
            />
            <div>
              <Label htmlFor={`${step.id}-needs-confirmation`}>Bestätigung erforderlich</Label>
              <p className="text-sm text-muted-foreground">
                Benutzer müssen den Schritt bestätigen
              </p>
              {step.needs_confirmation && (
                <Select
                  value={step.confirmation_type || "checkbox"}
                  onValueChange={value => onUpdate(step.id, "confirmation_type", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checkbox">Checkbox</SelectItem>
                    <SelectItem value="text">Textfeld</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
