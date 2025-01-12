import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'restaurant' | 'customer' | 'delivery_partner' | 'lead_partner';
  created_at: string;
  user: {
    email: string;
    full_name: string | null;
  };
}

export default function Roles() {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select(`
          *,
          user:profiles!user_roles_user_id_fkey(
            email,
            full_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Type guard to ensure data matches our interface
      const validRoles = data?.filter((role): role is UserRole => 
        role.user && 
        typeof role.user === 'object' && 
        'email' in role.user
      ) || [];

      setRoles(validRoles);
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast({
        title: "Error",
        description: "Failed to fetch roles",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (userId: string, newRole: 'admin' | 'restaurant' | 'customer' | 'delivery_partner' | 'lead_partner') => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({
          user_id: userId,
          role: newRole
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Role updated successfully"
      });

      fetchRoles();
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: "Error",
        description: "Failed to update role",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>User Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.user?.full_name || 'N/A'}</TableCell>
                  <TableCell>{role.user?.email}</TableCell>
                  <TableCell>{role.role}</TableCell>
                  <TableCell>
                    <Select
                      defaultValue={role.role}
                      onValueChange={(value: 'admin' | 'restaurant' | 'customer' | 'delivery_partner' | 'lead_partner') => updateRole(role.user_id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="delivery_partner">Delivery Partner</SelectItem>
                        <SelectItem value="lead_partner">Lead Partner</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}