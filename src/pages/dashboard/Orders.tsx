import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Package, Clock, DollarSign } from "lucide-react";

const demoOrders = [
  {
    id: "1",
    order_number: "ORD001",
    customer_name: "John Doe",
    total_amount: 49.99,
    status: "delivered",
    created_at: "2024-03-15T10:30:00Z"
  },
  {
    id: "2",
    order_number: "ORD002",
    customer_name: "Jane Smith",
    total_amount: 75.50,
    status: "pending",
    created_at: "2024-03-15T11:45:00Z"
  },
  {
    id: "3",
    order_number: "ORD003",
    customer_name: "Mike Johnson",
    total_amount: 32.25,
    status: "cancelled",
    created_at: "2024-03-15T09:15:00Z"
  },
  {
    id: "4",
    order_number: "ORD004",
    customer_name: "Sarah Williams",
    total_amount: 128.75,
    status: "delivered",
    created_at: "2024-03-15T13:20:00Z"
  },
  {
    id: "5",
    order_number: "ORD005",
    customer_name: "Robert Brown",
    total_amount: 95.00,
    status: "pending",
    created_at: "2024-03-15T14:10:00Z"
  }
];

export default function Orders() {
  const navigate = useNavigate();

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
              {demoOrders.map((order) => (
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