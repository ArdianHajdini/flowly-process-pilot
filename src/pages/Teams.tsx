
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTeams, TeamMember } from "@/hooks/useTeams";
import { useTeam } from "@/hooks/useTeam";
import { Building2, Plus, UserPlus } from "lucide-react";

const Teams = () => {
  const { teamMembers: allUsers } = useTeam();
  const { 
    teams, 
    teamMembers, 
    isLoading,
    createTeam,
    addTeamMember,
    updateTeamMemberRole,
    removeTeamMember
  } = useTeams();

  const [newTeam, setNewTeam] = useState({ name: '', description: '' });
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);

  const handleCreateTeam = async () => {
    await createTeam.mutateAsync(newTeam);
    setNewTeam({ name: '', description: '' });
    setShowNewTeamDialog(false);
  };

  if (isLoading) return <div>Lade Teams...</div>;

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
          <p className="text-muted-foreground mt-2">
            Verwalten Sie Ihre Teams und deren Mitglieder
          </p>
        </div>
        <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
          <DialogTrigger asChild>
            <Button>
              <Building2 className="mr-2 h-4 w-4" />
              Team erstellen
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neues Team erstellen</DialogTitle>
              <DialogDescription>
                Erstellen Sie ein neues Team für Ihre Organisation
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name">Name</label>
                <Input
                  id="name"
                  value={newTeam.name}
                  onChange={(e) => setNewTeam(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description">Beschreibung</label>
                <Textarea
                  id="description"
                  value={newTeam.description}
                  onChange={(e) => setNewTeam(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowNewTeamDialog(false)}
              >
                Abbrechen
              </Button>
              <Button 
                onClick={handleCreateTeam}
                disabled={!newTeam.name}
              >
                Team erstellen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {teams?.map((team) => (
          <Card key={team.id} className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">{team.name}</h3>
                {team.description && (
                  <p className="text-muted-foreground mt-1">{team.description}</p>
                )}
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Mitglied hinzufügen
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Team-Mitglied hinzufügen</DialogTitle>
                    <DialogDescription>
                      Fügen Sie neue Mitglieder zu diesem Team hinzu
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Select
                      onValueChange={(userId) => {
                        if (userId) {
                          addTeamMember.mutate({
                            teamId: team.id,
                            userId,
                            role: 'team_member'
                          });
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Wählen Sie einen Benutzer" />
                      </SelectTrigger>
                      <SelectContent>
                        {allUsers
                          ?.filter(user => !teamMembers?.some(
                            member => member.team_id === team.id && member.user_id === user.id
                          ))
                          .map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.first_name} {user.last_name}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Rolle</TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers
                  ?.filter(member => member.team_id === team.id)
                  .map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        {member.profile?.first_name} {member.profile?.last_name}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={member.role}
                          onValueChange={(role: TeamMember['role']) => {
                            updateTeamMemberRole.mutate({
                              memberId: member.id,
                              role
                            });
                          }}
                        >
                          <SelectTrigger className="w-[200px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="team_leader">Teamleiter</SelectItem>
                            <SelectItem value="team_member">Mitarbeiter</SelectItem>
                            <SelectItem value="team_admin">Team-Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeTeamMember.mutate(member.id)}
                        >
                          Entfernen
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Teams;
