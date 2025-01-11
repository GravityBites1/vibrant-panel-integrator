import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const Inventory = () => {
  const { data: inventory, isLoading } = useQuery({
    queryKey: ['inventory'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('inventory_items')
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
          <CardTitle>Inventory Management</CardTitle>
        </CardHeader>
        <CardContent>
          {inventory?.map((item) => (
            <div key={item.id} className="mb-4 p-4 border rounded">
              <div className="flex justify-between">
                <div>Quantity: {item.quantity}</div>
                <div>Low Stock Threshold: {item.low_stock_threshold}</div>
              </div>
              <div className="mt-2">
                Tracking Enabled: {item.is_tracking_enabled ? 'Yes' : 'No'}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;