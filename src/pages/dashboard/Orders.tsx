import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Package, Clock, DollarSign } from "lucide-react";

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  total_amount: number;
  status: string;
  created_at: string;
}

export default function Orders() {
  const navigate = useNavigate();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <Card>
          <div className="p-4">
            <div className="flex items-center space-x-4 mb-4">
              <Package className="h-6 w-6 text-gray-400" />
              <h2 className="text-2xl font-semibold">Orders</h2>
            </div>
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-12 bg-gray-100 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card>
        <div className="p-4">
          <div className="flex items-center space-x-4 mb-4">
            <Package className="h-6 w-6 text-gray-600" />
            <h2 className="text-2xl font-semibold">Orders</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4" />
                    <span>Order #</span>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center space-x-2">
                    <span>Customer</span>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Amount</span>
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Date</span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order) => (
                <TableRow 
                  key={order.id}
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  <TableCell className="font-medium">{order.order_number}</TableCell>
                  <TableCell>{order.customer_name}</TableCell>
                  <TableCell>${order.total_amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary"
                      className={getStatusColor(order.status)}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}