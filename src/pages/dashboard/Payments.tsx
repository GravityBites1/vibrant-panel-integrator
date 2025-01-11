import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const Payments = () => {
  const { data: payments, isLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
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
          <CardTitle>Payments</CardTitle>
        </CardHeader>
        <CardContent>
          {payments?.map((payment) => (
            <div key={payment.id} className="mb-4 p-4 border rounded">
              <div className="flex justify-between">
                <div>Amount: ${payment.amount}</div>
                <div>Status: {payment.status}</div>
              </div>
              <div className="mt-2">
                Created: {new Date(payment.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;