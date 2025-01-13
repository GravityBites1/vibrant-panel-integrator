import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, HeatMapGrid } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CityMetrics {
  total_orders: number;
  delivery_success_rate: number;
  avg_delivery_time: number;
  revenue: number;
  period_start: string;
}

interface LeadPartnerMetrics {
  partner_id: string;
  name: string;
  stores_onboarded: number;
  revenue_generated: number;
  active_stores: number;
}

export function CityAnalytics({ cityId }: { cityId: string }) {
  const { data: metrics } = useQuery({
    queryKey: ['cityMetrics', cityId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('city_radius_metrics')
        .select('*')
        .eq('city_id', cityId)
        .order('period_start', { ascending: true });

      if (error) throw error;
      return data as CityMetrics[];
    }
  });

  const { data: leadPartnerMetrics } = useQuery({
    queryKey: ['leadPartnerMetrics', cityId],
    queryFn: async () => {
      // Demo data for lead partner performance
      return [
        { partner_id: '1', name: 'Partner A', stores_onboarded: 25, revenue_generated: 50000, active_stores: 20 },
        { partner_id: '2', name: 'Partner B', stores_onboarded: 18, revenue_generated: 35000, active_stores: 15 },
        { partner_id: '3', name: 'Partner C', stores_onboarded: 30, revenue_generated: 65000, active_stores: 28 },
      ] as LeadPartnerMetrics[];
    }
  });

  if (!metrics?.length) {
    return <div>No analytics data available</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics[metrics.length - 1].total_orders}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics[metrics.length - 1].delivery_success_rate.toFixed(1)}%
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Delivery Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics[metrics.length - 1].avg_delivery_time} min</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{metrics[metrics.length - 1].revenue.toLocaleString()}</div>
        </CardContent>
      </Card>

      {/* Revenue Trend Line Chart */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="period_start" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8884d8" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Lead Partner Performance Bar Chart */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Lead Partner Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadPartnerMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="stores_onboarded" fill="#8884d8" name="Stores Onboarded" />
                <Bar dataKey="active_stores" fill="#82ca9d" name="Active Stores" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}