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

interface AdImpressionData {
  created_at: string;
  campaign_id: string;
  clicks_count: number;
  conversions_count: number;
}

export function CampaignMetrics({ campaignId }: { campaignId?: string }) {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['campaignMetrics', campaignId],
    queryFn: async () => {
      console.log('Fetching campaign metrics...');
      
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      // First get impressions
      const { data: impressionsData, error: impressionsError } = await supabase
        .from('ad_impressions')
        .select('created_at, campaign_id')
        .gte('created_at', sevenDaysAgo.toISOString())
        .eq(campaignId ? 'campaign_id' : 'campaign_id', campaignId || '');

      if (impressionsError) {
        console.error('Error fetching impressions:', impressionsError);
        throw impressionsError;
      }

      // Get clicks count
      const { data: clicksData, error: clicksError } = await supabase
        .from('ad_clicks')
        .select('campaign_id, created_at')
        .gte('created_at', sevenDaysAgo.toISOString())
        .eq(campaignId ? 'campaign_id' : 'campaign_id', campaignId || '');

      if (clicksError) {
        console.error('Error fetching clicks:', clicksError);
        throw clicksError;
      }

      // Get conversions count
      const { data: conversionsData, error: conversionsError } = await supabase
        .from('ad_conversions')
        .select('campaign_id, created_at')
        .gte('created_at', sevenDaysAgo.toISOString())
        .eq(campaignId ? 'campaign_id' : 'campaign_id', campaignId || '');

      if (conversionsError) {
        console.error('Error fetching conversions:', conversionsError);
        throw conversionsError;
      }

      // Process and aggregate data by date
      const aggregatedData = impressionsData.reduce((acc: Record<string, CampaignMetric>, curr) => {
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
        
        // Add clicks for this date
        acc[date].clicks = clicksData?.filter(click => 
          new Date(click.created_at).toISOString().split('T')[0] === date
        ).length || 0;
        
        // Add conversions for this date
        acc[date].conversions = conversionsData?.filter(conversion => 
          new Date(conversion.created_at).toISOString().split('T')[0] === date
        ).length || 0;
        
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