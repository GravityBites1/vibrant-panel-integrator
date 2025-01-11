import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const SupportTickets = () => {
  const { data: tickets, isLoading } = useQuery({
    queryKey: ['support-tickets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Support Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          {tickets?.map((ticket) => (
            <div key={ticket.id} className="mb-4 p-4 border rounded">
              <div className="flex justify-between">
                <div>Status: {ticket.status}</div>
                <div>Priority: {ticket.priority}</div>
              </div>
              <div className="mt-2">
                <h3 className="font-semibold">{ticket.title}</h3>
                <p>{ticket.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportTickets;