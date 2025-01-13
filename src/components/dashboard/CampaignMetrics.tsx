import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CampaignMetric {
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue: number;
}

export function CampaignMetrics({ campaignId }: { campaignId?: string }) {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['campaignMetrics', campaignId],
    queryFn: async () => {
      console.log('Fetching campaign metrics...');
      
      // If no campaignId, get aggregated metrics for all campaigns
      const query = supabase
        .from('ad_impressions')
        .select(`
          created_at,
          campaign_id,
          ad_clicks (count),
          ad_conversions (count)
        `)
        .eq(campaignId ? 'campaign_id' : 'campaign_id', campaignId)
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching metrics:', error);
        throw error;
      }

      // Process and aggregate data by date
      const aggregatedData = data.reduce((acc: Record<string, CampaignMetric>, curr) => {
        const date = new Date(curr.created_at).toISOString().split('T')[0];
        if (!acc[date]) {
          acc[date] = {
            date,
            impressions: 0,
            clicks: 0,
            conversions: 0,
            spend: 0,
            revenue: 0
          };
        }
        acc[date].impressions++;
        acc[date].clicks += curr.ad_clicks?.[0]?.count || 0;
        acc[date].conversions += curr.ad_conversions?.[0]?.count || 0;
        return acc;
      }, {});

      return Object.values(aggregatedData);
    }
  });

  if (isLoading) {
    return <div>Loading metrics...</div>;
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Campaign Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="impressions" 
                stroke="#8884d8" 
                name="Impressions"
              />
              <Line 
                type="monotone" 
                dataKey="clicks" 
                stroke="#82ca9d" 
                name="Clicks"
              />
              <Line 
                type="monotone" 
                dataKey="conversions" 
                stroke="#ffc658" 
                name="Conversions"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}