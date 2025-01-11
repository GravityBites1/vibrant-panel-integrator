import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Package, Truck, User } from "lucide-react";

interface Order {
  id: string;
  customer_id: string;
  store_id: string;
  status: string;
  total_amount: number;
  created_at: string;
  order_number: string;
  delivery_address: string;
  customer_name: string;
  delivery_partner_id: string;
  delivery_instructions: string;
}

export default function OrderDetails() {
  const { id } = useParams();

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Left Panel - Order List & Details */}
      <div className="w-1/2 p-6 overflow-auto border-r">
        <div className="space-y-6">
          {/* Order Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Order #{order.order_number}</h2>
            <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
              {order.status}
            </span>
          </div>

          {/* Order Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Order ID</div>
              <div className="font-semibold">{order.id.slice(0, 8)}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Created</div>
              <div className="font-semibold">
                {new Date(order.created_at).toLocaleDateString()}
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Amount</div>
              <div className="font-semibold">${order.total_amount}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Status</div>
              <div className="font-semibold">{order.status}</div>
            </Card>
          </div>

          {/* Order Details */}
          <div className="space-y-6">
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Customer</div>
                  <div className="font-semibold">{order.customer_name}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Delivery Address</div>
                  <div className="font-semibold">{order.delivery_address}</div>
                  {order.delivery_instructions && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Note: {order.delivery_instructions}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Delivery Partner</div>
                  <div className="font-semibold">
                    {order.delivery_partner_id || 'Not assigned'}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Timeline */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Order Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="flex-1">
                  <div className="text-sm">Order Created</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
              {/* Add more timeline items based on order status history */}
            </div>
          </Card>
        </div>
      </div>

      {/* Right Panel - Map View */}
      <div className="w-1/2 p-6">
        <Card className="h-full">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Delivery Tracking</h3>
          </div>
          <div className="h-[calc(100%-57px)] bg-muted rounded-b-lg">
            {/* Add map component here */}
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Map view will be implemented here
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}