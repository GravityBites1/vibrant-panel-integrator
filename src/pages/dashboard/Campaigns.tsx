import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; 
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Search, Sun, Moon, Layout, Grid, List } from "lucide-react";
import { CampaignInsights } from "@/components/dashboard/CampaignInsights";
import { CampaignMetrics } from "@/components/dashboard/CampaignMetrics";
import { PredictiveAnalytics } from "@/components/dashboard/PredictiveAnalytics";
import { CampaignFilters, CampaignFilters as CampaignFiltersType } from "@/components/dashboard/CampaignFilters";
import { CampaignGeographicPerformance } from "@/components/dashboard/CampaignGeographicPerformance";
import { CampaignSpendingTrends } from "@/components/dashboard/CampaignSpendingTrends";
import { CampaignAIInsights } from "@/components/dashboard/CampaignAIInsights";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { StoresRunningAds } from "@/components/dashboard/StoresRunningAds";

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
  const [filters, setFilters] = useState<CampaignFiltersType>({
    dateRange: { from: undefined, to: undefined },
    campaignType: "",
    store: "",
    city: ""
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleWidgets, setVisibleWidgets] = useState({
    aiInsights: true,
    spendingTrends: true,
    geographicPerformance: true,
    predictiveAnalytics: true
  });

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

  const handleFilterChange = (newFilters: CampaignFiltersType) => {
    setFilters(newFilters);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleWidget = (widget: keyof typeof visibleWidgets) => {
    setVisibleWidgets(prev => ({
      ...prev,
      [widget]: !prev[widget]
    }));
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Loading campaigns...</div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 p-6 transition-colors duration-200 ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Campaign Performance</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="w-10 h-10"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="w-10 h-10"
          >
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </Button>
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
      </div>

      <CampaignFilters onFilterChange={handleFilterChange} />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Stores Running Ads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.total_stores}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.active_campaigns}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${metrics.total_budget.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
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

      <StoresRunningAds />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Dashboard Widgets</h2>
          <div className="flex gap-4">
            {Object.entries(visibleWidgets).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <Switch
                  checked={value}
                  onCheckedChange={() => toggleWidget(key as keyof typeof visibleWidgets)}
                />
                <span className="text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-6`}>
          {visibleWidgets.aiInsights && <CampaignAIInsights />}
          {visibleWidgets.spendingTrends && <CampaignSpendingTrends />}
          {visibleWidgets.geographicPerformance && <CampaignGeographicPerformance />}
          {visibleWidgets.predictiveAnalytics && <PredictiveAnalytics />}
        </div>
      </div>

      <CampaignMetrics />

      <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6`}>
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="hover:shadow-lg transition-shadow duration-200">
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