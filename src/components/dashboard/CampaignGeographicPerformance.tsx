import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RegionPerformance {
  region: string;
  clicks: number;
  conversions: number;
  ctr: number;
}

export function CampaignGeographicPerformance() {
  const { data: performanceData, isLoading } = useQuery({
    queryKey: ['campaignGeographicPerformance'],
    queryFn: async () => {
      console.log('Fetching geographic performance data...');
      
      // Demo data - replace with actual data from your database
      const demoData: RegionPerformance[] = [
        { region: 'North', clicks: 1200, conversions: 180, ctr: 15 },
        { region: 'South', clicks: 800, conversions: 140, ctr: 17.5 },
        { region: 'East', clicks: 1400, conversions: 210, ctr: 15 },
        { region: 'West', clicks: 1100, conversions: 165, ctr: 15 },
      ];
      
      return demoData;
    }
  });

  if (isLoading) {
    return <div>Loading geographic performance data...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Geographic Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="clicks" fill="#8884d8" name="Clicks" />
              <Bar yAxisId="left" dataKey="conversions" fill="#82ca9d" name="Conversions" />
              <Bar yAxisId="right" dataKey="ctr" fill="#ffc658" name="CTR %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}