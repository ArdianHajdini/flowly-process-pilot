
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type TeamMember = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string | null;
  updated_at: string | null;
  user_role?: string;
}

export const useTeam = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: teamMembers, isLoading } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      // Zuerst holen wir alle Profile
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          first_name,
          last_name,
          created_at,
          updated_at
        `);

      if (profilesError) throw profilesError;
      
      // Dann holen wir die Rollen für jeden Benutzer separat
      const membersWithRoles = await Promise.all(
        profiles.map(async (profile) => {
          const { data: roleData, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', profile.id)
            .single();
          
          if (roleError && roleError.code !== 'PGRST116') {
            console.error('Error fetching role:', roleError);
          }

          return {
            ...profile,
            user_role: roleData?.role || 'employee'
          };
        })
      );

      return membersWithRoles as TeamMember[];
    },
  });

  const updateRole = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: 'admin' | 'manager' | 'employee' }) => {
      // Überprüfen, ob der Benutzer bereits eine Rolle hat
      const { data: existingRole, error: checkError } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (checkError && checkError.code !== 'PGRST116') throw checkError;

      if (existingRole) {
        // Aktualisieren der bestehenden Rolle
        const { error } = await supabase
          .from('user_roles')
          .update({ role })
          .eq('user_id', userId);

        if (error) throw error;
      } else {
        // Erstellen einer neuen Rolle, falls keine existiert
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({
        title: "Rolle aktualisiert",
        description: "Die Rolle wurde erfolgreich aktualisiert",
      });
    },
    onError: (error) => {
      toast({
        title: "Fehler",
        description: "Die Rolle konnte nicht aktualisiert werden",
        variant: "destructive",
      });
      console.error('Error updating role:', error);
    },
  });

  const removeTeamMember = useMutation({
    mutationFn: async (userId: string) => {
      const { error: userRoleError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      if (userRoleError) throw userRoleError;

      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (profileError) throw profileError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({
        title: "Teammitglied entfernt",
        description: "Das Teammitglied wurde erfolgreich entfernt",
      });
    },
    onError: (error) => {
      toast({
        title: "Fehler",
        description: "Das Teammitglied konnte nicht entfernt werden",
        variant: "destructive",
      });
      console.error('Error removing team member:', error);
    },
  });

  return {
    teamMembers,
    isLoading,
    updateRole,
    removeTeamMember,
  };
};
