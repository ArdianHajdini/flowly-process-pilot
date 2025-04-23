
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Process, ProcessTemplate, NewProcess } from '@/types/process';

export const useProcesses = () => {
  const queryClient = useQueryClient();

  const { data: processes, isLoading: isLoadingProcesses } = useQuery({
    queryKey: ['processes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('processes')
        .select('*')
        .order('started_at', { ascending: false });

      if (error) throw error;
      return data as Process[];
    },
  });

  const { data: templates, isLoading: isLoadingTemplates } = useQuery({
    queryKey: ['process_templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('process_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ProcessTemplate[];
    },
  });

  const createProcess = useMutation({
    mutationFn: async (newProcess: NewProcess) => {
      const { data, error } = await supabase
        .from('processes')
        .insert([newProcess])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['processes'] });
    },
  });

  const updateProcess = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Process> & { id: string }) => {
      const { data, error } = await supabase
        .from('processes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['processes'] });
    },
  });

  return {
    processes,
    templates,
    isLoading: isLoadingProcesses || isLoadingTemplates,
    createProcess,
    updateProcess,
  };
};
