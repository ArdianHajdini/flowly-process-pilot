
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, UserPlus } from "lucide-react";
import { useTeam } from "@/hooks/useTeam";

const Team = () => {
  const { teamMembers, isLoading, updateRole, removeTeamMember } = useTeam();

  const handleRoleChange = (userId: string, newRole: 'admin' | 'manager' | 'employee') => {
    updateRole.mutate({ userId, role: newRole });
  };

  const handleRemoveMember = (userId: string) => {
    removeTeamMember.mutate(userId);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Team</h1>
        <Button
          className="bg-[#6E59A5] hover:bg-[#5A4982] text-white transition-colors"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Mitglied einladen
        </Button>
      </div>

      {isLoading ? (
        <div>Lade Team...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers?.map((member) => (
            <Card key={member.id} className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">
                    {member.first_name} {member.last_name}
                  </h3>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="text-red-500 hover:bg-red-50 border-red-200/50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Teammitglied entfernen?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Diese Aktion kann nicht rückgängig gemacht werden. Das Teammitglied verliert den Zugriff auf das System.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleRemoveMember(member.id)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Entfernen
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <Select
                value={member.user_roles?.[0]?.role || 'employee'}
                onValueChange={(value: 'admin' | 'manager' | 'employee') => 
                  handleRoleChange(member.id, value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Leitung</SelectItem>
                  <SelectItem value="employee">Mitarbeiter</SelectItem>
                </SelectContent>
              </Select>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Team;
