import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ActivityLog {
  id: string;
  admin_id: string;
  action: string;
  details: Record<string, any>;
  ip_address: string | null;
  created_at: string;
}

export function AdminActivityLogs() {
  const { data: logs, isLoading } = useQuery({
    queryKey: ['adminActivityLogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_activity_logs')
        .select(`
          *,
          profiles:admin_id (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        toast({
          title: "Error fetching activity logs",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }

      return data as ActivityLog[];
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Activity Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {logs?.map((log) => (
            <div 
              key={log.id}
              className="flex items-start justify-between p-4 border rounded-lg"
            >
              <div>
                <p className="font-medium">{log.action}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(log.created_at).toLocaleString()}
                </p>
                {log.details && Object.keys(log.details).length > 0 && (
                  <pre className="mt-2 text-sm bg-muted p-2 rounded">
                    {JSON.stringify(log.details, null, 2)}
                  </pre>
                )}
              </div>
              {log.ip_address && (
                <span className="text-sm text-muted-foreground">
                  IP: {log.ip_address}
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}