import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Campaign {
  id: string;
  name: string;
  description: string | null;
  status: string;
  budget_amount: number;
  spent_amount: number;
  start_date: string | null;
  end_date: string | null;
}

interface CampaignMetrics {
  id: string;
  budget_range_start: number;
  budget_range_end: number;
  estimated_menu_visits: number;
  estimated_orders_min: number;
  estimated_orders_max: number;
  estimated_reach_min: number;
  estimated_reach_max: number;
  estimated_sales_min: number;
  estimated_sales_max: number;
}

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [metrics, setMetrics] = useState<CampaignMetrics[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCampaigns();
    setupRealtimeSubscription();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const { data: campaignData, error: campaignError } = await supabase
        .from('ad_campaigns')
        .select('*');

      if (campaignError) throw campaignError;

      const { data: metricsData, error: metricsError } = await supabase
        .from('ad_campaign_metrics')
        .select('*');

      if (metricsError) throw metricsError;

      setCampaigns(campaignData);
      setMetrics(metricsData);
    } catch (error) {
      console.error('Error fetching campaign data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch campaign data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('campaign-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ad_campaigns' },
        (payload) => {
          console.log('Campaign change received:', payload);
          fetchCampaigns();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ad_campaign_metrics' },
        (payload) => {
          console.log('Metrics change received:', payload);
          fetchCampaigns();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  if (isLoading) {
    return <div>Loading campaigns...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Campaign Performance</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.filter(c => c.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${campaigns.reduce((sum, c) => sum + (c.budget_amount || 0), 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${campaigns.reduce((sum, c) => sum + (c.spent_amount || 0), 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={campaigns}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="start_date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="spent_amount" 
                  stroke="#8884d8" 
                  name="Spend"
                />
                <Line 
                  type="monotone" 
                  dataKey="budget_amount" 
                  stroke="#82ca9d" 
                  name="Budget"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <CardTitle>{campaign.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>{campaign.description}</p>
                <p>Status: {campaign.status}</p>
                <p>Budget: ${campaign.budget_amount}</p>
                <p>Spent: ${campaign.spent_amount}</p>
                {campaign.start_date && (
                  <p>Start Date: {new Date(campaign.start_date).toLocaleDateString()}</p>
                )}
                {campaign.end_date && (
                  <p>End Date: {new Date(campaign.end_date).toLocaleDateString()}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}