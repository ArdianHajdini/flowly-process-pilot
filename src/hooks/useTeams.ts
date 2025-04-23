
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext'; 

export type Team = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  created_by: string;
  updated_at: string;
};

export type TeamMember = {
  id: string;
  team_id: string;
  user_id: string;
  role: 'team_leader' | 'team_member' | 'team_admin';
  created_at: string;
  updated_at: string;
  profile?: {
    first_name: string | null;
    last_name: string | null;
  };
};

export const useTeams = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user?.id;

  const { data: teams, isLoading: isLoadingTeams } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as Team[];
    },
  });

  // Getrennte Abfrage für Team-Mitglieder und Profile
  const { data: teamMembers, isLoading: isLoadingMembers } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      // Team-Mitglieder abrufen
      const { data: membersData, error: membersError } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at');
      
      if (membersError) throw membersError;

      // Profile für alle Team-Mitglieder abrufen
      const userIds = membersData.map(member => member.user_id);
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name')
        .in('id', userIds);
      
      if (profilesError) throw profilesError;

      // Kombination von Mitgliedsdaten mit Profildaten
      const enrichedMembers = membersData.map(member => {
        const profile = profilesData.find(p => p.id === member.user_id);
        return {
          ...member,
          profile: profile ? {
            first_name: profile.first_name,
            last_name: profile.last_name
          } : {
            first_name: null,
            last_name: null
          }
        };
      });

      return enrichedMembers as TeamMember[];
    },
  });

  const createTeam = useMutation({
    mutationFn: async ({ name, description }: { name: string; description?: string }) => {
      if (!userId) throw new Error("Benutzer nicht authentifiziert");
      
      const { data, error } = await supabase
        .from('teams')
        .insert([{ 
          name, 
          description, 
          created_by: userId 
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      toast({
        title: "Team erstellt",
        description: "Das Team wurde erfolgreich erstellt",
      });
    },
    onError: (error) => {
      toast({
        title: "Fehler",
        description: "Das Team konnte nicht erstellt werden",
        variant: "destructive",
      });
      console.error('Error creating team:', error);
    },
  });

  const updateTeam = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Team> & { id: string }) => {
      const { data, error } = await supabase
        .from('teams')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      toast({
        title: "Team aktualisiert",
        description: "Das Team wurde erfolgreich aktualisiert",
      });
    },
    onError: (error) => {
      toast({
        title: "Fehler",
        description: "Das Team konnte nicht aktualisiert werden",
        variant: "destructive",
      });
      console.error('Error updating team:', error);
    },
  });

  const addTeamMember = useMutation({
    mutationFn: async ({ 
      teamId, 
      userId, 
      role 
    }: { 
      teamId: string; 
      userId: string; 
      role: TeamMember['role'];
    }) => {
      const { data, error } = await supabase
        .from('team_members')
        .insert([{ team_id: teamId, user_id: userId, role }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({
        title: "Mitglied hinzugefügt",
        description: "Das Teammitglied wurde erfolgreich hinzugefügt",
      });
    },
    onError: (error) => {
      toast({
        title: "Fehler",
        description: "Das Teammitglied konnte nicht hinzugefügt werden",
        variant: "destructive",
      });
      console.error('Error adding team member:', error);
    },
  });

  const updateTeamMemberRole = useMutation({
    mutationFn: async ({ 
      memberId, 
      role 
    }: { 
      memberId: string; 
      role: TeamMember['role'];
    }) => {
      const { data, error } = await supabase
        .from('team_members')
        .update({ role })
        .eq('id', memberId)
        .select()
        .single();

      if (error) throw error;
      return data;
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
      console.error('Error updating team member role:', error);
    },
  });

  const removeTeamMember = useMutation({
    mutationFn: async (memberId: string) => {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', memberId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({
        title: "Mitglied entfernt",
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
    teams,
    teamMembers,
    isLoading: isLoadingTeams || isLoadingMembers,
    createTeam,
    updateTeam,
    addTeamMember,
    updateTeamMemberRole,
    removeTeamMember,
  };
};
