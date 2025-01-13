import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Prediction {
  date: string;
  predicted_orders: number;
  predicted_revenue: number;
  confidence: number;
}

export function PredictiveAnalytics() {
  const { data: predictions, isLoading } = useQuery({
    queryKey: ['predictions'],
    queryFn: async () => {
      // Generate demo prediction data for the next 7 days
      const demoPredictions: Prediction[] = Array.from({ length: 7 }).map((_, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);
        const baseOrders = 250;
        const baseRevenue = 60000;
        const trendFactor = 1 + (index * 0.05); // 5% increase trend
        const randomVariation = 0.9 + Math.random() * 0.2; // ±10% random variation

        return {
          date: date.toISOString(),
          predicted_orders: Math.round(baseOrders * trendFactor * randomVariation),
          predicted_revenue: Math.round(baseRevenue * trendFactor * randomVariation),
          confidence: 85 + Math.random() * 10
        };
      });
      return demoPredictions;
    }
  });

  if (isLoading) {
    return <div>Loading predictions...</div>;
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Predictive Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={predictions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Line 
                type="monotone" 
                dataKey="predicted_orders" 
                stroke="#8884d8" 
                name="Predicted Orders"
              />
              <Line 
                type="monotone" 
                dataKey="predicted_revenue" 
                stroke="#82ca9d" 
                name="Predicted Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}