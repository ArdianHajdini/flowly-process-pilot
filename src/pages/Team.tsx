
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, UserPlus } from "lucide-react";

const Team = () => {
  // Mock data
  const teamMembers = [
    { id: 1, name: "Max Mustermann", email: "max@firma.de", department: "IT", role: "Admin" },
    { id: 2, name: "Anna Schmidt", email: "anna@firma.de", department: "Finanzen", role: "Leitung" },
    { id: 3, name: "Tobias Müller", email: "tobias@firma.de", department: "Marketing", role: "Bearbeiter" },
    { id: 4, name: "Laura Weber", email: "laura@firma.de", department: "HR", role: "Leitung" },
    { id: 5, name: "Michael Wolf", email: "michael@firma.de", department: "Verkauf", role: "Bearbeiter" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Team</h1>
        <Button className="gap-2">
          <UserPlus size={16} />
          Teammitglied hinzufügen
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Suche nach Namen, E-Mail..."
              className="w-full pl-10"
            />
          </div>
        </div>
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Abteilung" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Abteilungen</SelectItem>
              <SelectItem value="it">IT</SelectItem>
              <SelectItem value="finance">Finanzen</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
              <SelectItem value="sales">Verkauf</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Rolle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Rollen</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="manager">Leitung</SelectItem>
              <SelectItem value="user">Bearbeiter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <div className="grid grid-cols-12 py-3 px-4 text-sm font-medium text-muted-foreground border-b">
              <div className="col-span-4">Name</div>
              <div className="col-span-3">E-Mail</div>
              <div className="col-span-2">Abteilung</div>
              <div className="col-span-2">Rolle</div>
              <div className="col-span-1"></div>
            </div>
            
            {teamMembers.map((member) => (
              <div 
                key={member.id} 
                className="grid grid-cols-12 py-3 px-4 border-b last:border-0 items-center hover:bg-muted/30 transition-colors cursor-pointer"
              >
                <div className="col-span-4 flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <div className="bg-primary/10 text-primary font-medium w-full h-full flex items-center justify-center">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </div>
                  </Avatar>
                  <div className="font-medium">{member.name}</div>
                </div>
                <div className="col-span-3 text-muted-foreground">{member.email}</div>
                <div className="col-span-2">{member.department}</div>
                <div className="col-span-2">
                  <div className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    member.role === "Admin" ? "bg-primary/10 text-primary" :
                    member.role === "Leitung" ? "bg-brand-100 text-brand-800" :
                    "bg-secondary text-secondary-foreground"
                  )}>
                    {member.role}
                  </div>
                </div>
                <div className="col-span-1 text-right">
                  <Button variant="ghost" size="sm">Bearbeiten</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Team;

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
