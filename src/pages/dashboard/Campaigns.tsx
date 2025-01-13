import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; 
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Search } from "lucide-react";
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
  total_stores: number;
  total_budget: number;
  total_spent: number;
  active_campaigns: number;
}

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [metrics, setMetrics] = useState<CampaignMetrics>({
    total_stores: 0,
    total_budget: 0,
    total_spent: 0,
    active_campaigns: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log("Fetching campaigns data...");
    fetchCampaigns();
    setupRealtimeSubscription();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const { data: campaignData, error: campaignError } = await supabase
        .from('ad_campaigns')
        .select(`
          *,
          stores:restaurant_id (
            name,
            description
          )
        `);

      console.log("Fetched campaign data:", campaignData);
      console.log("Campaign error if any:", campaignError);

      if (campaignError) throw campaignError;

      if (campaignData) {
        setCampaigns(campaignData);
        
        const metrics: CampaignMetrics = {
          total_stores: new Set(campaignData.map(c => c.restaurant_id)).size,
          total_budget: campaignData.reduce((sum, c) => sum + (c.budget_amount || 0), 0),
          total_spent: campaignData.reduce((sum, c) => sum + (c.spent_amount || 0), 0),
          active_campaigns: campaignData.filter(c => c.status === 'active').length
        };
        
        console.log("Calculated metrics:", metrics);
        setMetrics(metrics);
      }
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
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const searchLower = searchTerm.toLowerCase();
    return (
      campaign.name.toLowerCase().includes(searchLower) ||
      (campaign.description?.toLowerCase().includes(searchLower)) ||
      campaign.status.toLowerCase().includes(searchLower)
    );
  });

  if (isLoading) {
    return <div>Loading campaigns...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Campaign Performance</h1>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-[250px]"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Stores Running Ads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.total_stores}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.active_campaigns}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${metrics.total_budget.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${metrics.total_spent.toFixed(2)}
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
              <LineChart data={filteredCampaigns}>
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
        {filteredCampaigns.map((campaign) => (
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
