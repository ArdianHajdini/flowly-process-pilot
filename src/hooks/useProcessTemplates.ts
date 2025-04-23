
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { ProcessTemplate, TemplateStep } from '@/types/process';
import { useToast } from '@/hooks/use-toast';

export const useProcessTemplates = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: templates, isLoading } = useQuery({
    queryKey: ['process_templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('process_templates')
        .select('*');

      if (error) throw error;
      return data as ProcessTemplate[];
    },
  });

  const saveTemplate = useMutation({
    mutationFn: async ({ name, description, steps }: {
      name: string;
      description: string | null;
      steps: Omit<TemplateStep, 'id' | 'template_id' | 'created_at' | 'updated_at'>[];
    }) => {
      const { data: template, error: templateError } = await supabase
        .from('process_templates')
        .insert([{ name, description }])
        .select()
        .single();

      if (templateError) throw templateError;

      const stepsWithTemplateId = steps.map(step => ({
        ...step,
        template_id: template.id,
      }));

      const { error: stepsError } = await supabase
        .from('template_steps')
        .insert(stepsWithTemplateId);

      if (stepsError) throw stepsError;

      return template;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['process_templates'] });
      toast({
        title: "Erfolg",
        description: "Prozessvorlage wurde gespeichert",
      });
    },
    onError: (error) => {
      toast({
        title: "Fehler",
        description: "Prozessvorlage konnte nicht gespeichert werden",
        variant: "destructive",
      });
      console.error('Error saving template:', error);
    },
  });

  return {
    templates,
    isLoading,
    saveTemplate,
  };
};
