import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MetricData {
  date: string;
  revenue: number;
  orders: number;
  active_partners: number;
  stores_onboarded: number;
}

export function PerformanceMetrics() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['performanceMetrics'],
    queryFn: async () => {
      // For demo purposes, return static data
      const demoData: MetricData[] = Array.from({ length: 30 }).map((_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - index));
        return {
          date: date.toISOString(),
          revenue: 50000 + Math.floor(Math.random() * 20000),
          orders: 200 + Math.floor(Math.random() * 100),
          active_partners: 80 + Math.floor(Math.random() * 20),
          stores_onboarded: 150 + Math.floor(Math.random() * 10)
        };
      });
      return demoData;
    }
  });

  if (isLoading) {
    return <div>Loading metrics...</div>;
  }

  const currentMetrics = metrics?.[metrics.length - 1];
  const previousMetrics = metrics?.[metrics.length - 2];

  const calculateChange = (current: number, previous: number) => {
    if (!previous) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{currentMetrics?.revenue.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {calculateChange(currentMetrics?.revenue || 0, previousMetrics?.revenue || 0)}% from last period
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Partners</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentMetrics?.active_partners}</div>
          <p className="text-xs text-muted-foreground">
            {calculateChange(currentMetrics?.active_partners || 0, previousMetrics?.active_partners || 0)}% from last period
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentMetrics?.orders}</div>
          <p className="text-xs text-muted-foreground">
            {calculateChange(currentMetrics?.orders || 0, previousMetrics?.orders || 0)}% from last period
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Stores Onboarded</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentMetrics?.stores_onboarded}</div>
          <p className="text-xs text-muted-foreground">
            {calculateChange(currentMetrics?.stores_onboarded || 0, previousMetrics?.stores_onboarded || 0)}% from last period
          </p>
        </CardContent>
      </Card>
    </div>
  );
}