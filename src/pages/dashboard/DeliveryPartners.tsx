import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const DeliveryPartners = () => {
  const { data: partners, isLoading } = useQuery({
    queryKey: ['delivery-partners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'delivery_partner')
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
          <CardTitle>Delivery Partners</CardTitle>
        </CardHeader>
        <CardContent>
          {partners?.map((partner) => (
            <div key={partner.id} className="mb-4 p-4 border rounded">
              <div className="flex justify-between">
                <div>{partner.full_name}</div>
                <div>Status: {partner.is_available ? 'Available' : 'Unavailable'}</div>
              </div>
              <div className="mt-2">
                <div>Phone: {partner.phone_number}</div>
                <div>Vehicle Type: {partner.vehicle_type}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryPartners;