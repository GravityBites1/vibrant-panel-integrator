import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, MousePointerClick, Target } from "lucide-react";

interface CampaignMetrics {
  total_active: number;
  total_spend: number;
  avg_ctr: number;
  avg_conversion_rate: number;
  avg_cpc: number;
  performance_data: {
    date: string;
    spend: number;
    clicks: number;
    conversions: number;
  }[];
  top_campaigns: {
    id: string;
    name: string;
    roi: number;
    spend: number;
    conversions: number;
  }[];
}

export default function AdCampaignsDashboard() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['campaignMetrics'],
    queryFn: async () => {
      console.log('Fetching campaign metrics...');
      
      // Get campaign metrics from various tables
      const { data: campaigns, error: campaignError } = await supabase
        .from('ad_campaigns')
        .select(`
          id,
          name,
          status,
          spent_amount,
          ad_clicks (count),
          ad_conversions (count)
        `)
        .eq('status', 'active');

      if (campaignError) {
        console.error('Error fetching campaigns:', campaignError);
        throw campaignError;
      }

      // Calculate metrics
      const totalActive = campaigns?.length || 0;
      const totalSpend = campaigns?.reduce((sum, c) => sum + (c.spent_amount || 0), 0) || 0;
      const totalClicks = campaigns?.reduce((sum, c) => sum + (c.ad_clicks?.[0]?.count || 0), 0) || 0;
      const totalConversions = campaigns?.reduce((sum, c) => sum + (c.ad_conversions?.[0]?.count || 0), 0) || 0;

      // Demo performance data
      const performanceData = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return {
          date: date.toISOString().split('T')[0],
          spend: Math.round(Math.random() * 1000),
          clicks: Math.round(Math.random() * 100),
          conversions: Math.round(Math.random() * 20)
        };
      });

      // Calculate top campaigns by ROI
      const topCampaigns = campaigns?.map(c => ({
        id: c.id,
        name: c.name,
        spend: c.spent_amount || 0,
        conversions: c.ad_conversions?.[0]?.count || 0,
        roi: ((c.ad_conversions?.[0]?.count || 0) * 100) / (c.spent_amount || 1)
      }))
      .sort((a, b) => b.roi - a.roi)
      .slice(0, 5) || [];

      const metrics: CampaignMetrics = {
        total_active: totalActive,
        total_spend: totalSpend,
        avg_ctr: totalClicks / (totalSpend || 1) * 100,
        avg_conversion_rate: (totalConversions / (totalClicks || 1)) * 100,
        avg_cpc: totalSpend / (totalClicks || 1),
        performance_data: performanceData,
        top_campaigns: topCampaigns
      };

      console.log('Campaign metrics:', metrics);
      return metrics;
    }
  });

  if (isLoading) {
    return <div>Loading campaign metrics...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Ad Campaign Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.total_active}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ad Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{metrics?.total_spend.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. CTR</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.avg_ctr.toFixed(2)}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.avg_conversion_rate.toFixed(2)}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. CPC</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{metrics?.avg_cpc.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics?.performance_data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="spend" 
                  stroke="#8884d8" 
                  name="Spend (₹)"
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

      {/* Top Performing Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metrics?.top_campaigns.map((campaign) => (
              <div 
                key={campaign.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{campaign.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {campaign.conversions} conversions • ₹{campaign.spend.toLocaleString()} spent
                  </p>
                </div>
                <div className="flex items-center">
                  {campaign.roi >= 1 ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  <span className={campaign.roi >= 1 ? "text-green-500" : "text-red-500"}>
                    {campaign.roi.toFixed(2)}x ROI
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}