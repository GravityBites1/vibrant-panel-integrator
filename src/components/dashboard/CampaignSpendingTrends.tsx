import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SpendingTrend {
  date: string;
  spend: number;
  budget: number;
}

export function CampaignSpendingTrends() {
  const { data: trendData, isLoading } = useQuery({
    queryKey: ['campaignSpendingTrends'],
    queryFn: async () => {
      console.log('Fetching spending trends data...');
      
      // Demo data - replace with actual data from your database
      const demoData: SpendingTrend[] = Array.from({ length: 30 }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return {
          date: date.toISOString().split('T')[0],
          spend: 5000 + Math.floor(Math.random() * 2000),
          budget: 7500
        };
      });
      
      return demoData;
    }
  });

  if (isLoading) {
    return <div>Loading spending trends...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Spending Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value) => `₹${value}`}
              />
              <Line 
                type="monotone" 
                dataKey="spend" 
                stroke="#8884d8" 
                name="Daily Spend"
              />
              <Line 
                type="monotone" 
                dataKey="budget" 
                stroke="#82ca9d" 
                strokeDasharray="5 5"
                name="Budget"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}